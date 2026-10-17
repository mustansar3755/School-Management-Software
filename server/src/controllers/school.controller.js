import School, { PLANS } from "../models/School.js";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// SCH-0001, SCH-0002 ...
const nextSchoolCode = async () => {
  const last = await School.findOne().sort({ createdAt: -1 }).select("code");
  const n = last ? parseInt(last.code.split("-")[1], 10) + 1 : 1;
  return `SCH-${String(n).padStart(4, "0")}`;
};

// GET /api/schools?search=&status=&plan=&page=&limit=
export const listSchools = asyncHandler(async (req, res) => {
  const { search, status, plan } = req.query;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);

  const filter = {};
  if (status) filter.status = status;
  if (plan) filter.plan = plan;
  if (search) {
    const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ name: rx }, { code: rx }, { city: rx }, { email: rx }];
  }

  const [items, total] = await Promise.all([
    School.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    School.countDocuments(filter),
  ]);

  res.json({ success: true, items, total, page, pages: Math.ceil(total / limit) });
});

// GET /api/schools/stats
export const schoolStats = asyncHandler(async (req, res) => {
  const [total, active, blocked, pro] = await Promise.all([
    School.countDocuments(),
    School.countDocuments({ status: "active" }),
    School.countDocuments({ status: "blocked" }),
    School.countDocuments({ plan: "pro" }),
  ]);
  const recent = await School.find().sort({ createdAt: -1 }).limit(5).lean();
  res.json({ success: true, stats: { total, active, blocked, pro, free: total - pro }, recent });
});

// POST /api/schools  -> school + uske admin ka account ek saath
export const createSchool = asyncHandler(async (req, res) => {
  const { name, email, phone, address, city, plan = "free", admin } = req.body;
  if (!name) throw new ApiError(400, "School name is required");
  if (!admin?.name || !admin?.email || !admin?.password) {
    throw new ApiError(400, "School admin name, email and password are required");
  }
  if (admin.password.length < 6) throw new ApiError(400, "Admin password must be at least 6 characters");
  if (!PLANS[plan]) throw new ApiError(400, "Invalid plan");

  const school = await School.create({
    name, email, phone, address, city, plan,
    code: await nextSchoolCode(),
    studentLimit: PLANS[plan].studentLimit,
    teacherLimit: PLANS[plan].teacherLimit,
  });

  try {
    await User.create({
      schoolId: school._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      password: admin.password,
      role: "admin",
    });
  } catch (err) {
    await School.findByIdAndDelete(school._id); // rollback
    throw err;
  }

  res.status(201).json({ success: true, school });
});

// GET /api/schools/:id
export const getSchool = asyncHandler(async (req, res) => {
  const school = await School.findById(req.params.id).lean();
  if (!school) throw new ApiError(404, "School not found");
  const admins = await User.find({ schoolId: school._id, role: "admin" }).select("name email phone isActive lastLoginAt").lean();
  res.json({ success: true, school, admins });
});

// PATCH /api/schools/:id
export const updateSchool = asyncHandler(async (req, res) => {
  const allowed = ["name", "email", "phone", "address", "city", "logo", "subscriptionEndsAt"];
  const updates = {};
  allowed.forEach((k) => req.body[k] !== undefined && (updates[k] = req.body[k]));

  const school = await School.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  if (!school) throw new ApiError(404, "School not found");
  res.json({ success: true, school });
});

// PATCH /api/schools/:id/status   body: { status: "blocked"|"active", reason }
export const setSchoolStatus = asyncHandler(async (req, res) => {
  const { status, reason = "" } = req.body;
  if (!["active", "blocked"].includes(status)) throw new ApiError(400, "Invalid status");
  const school = await School.findByIdAndUpdate(
    req.params.id,
    { status, blockedReason: status === "blocked" ? reason : "" },
    { new: true }
  );
  if (!school) throw new ApiError(404, "School not found");
  res.json({ success: true, school });
});

// PATCH /api/schools/:id/plan   body: { plan: "free"|"pro" }
export const setSchoolPlan = asyncHandler(async (req, res) => {
  const { plan } = req.body;
  if (!PLANS[plan]) throw new ApiError(400, "Invalid plan");
  const school = await School.findByIdAndUpdate(
    req.params.id,
    { plan, studentLimit: PLANS[plan].studentLimit, teacherLimit: PLANS[plan].teacherLimit },
    { new: true }
  );
  if (!school) throw new ApiError(404, "School not found");
  res.json({ success: true, school });
});

// PATCH /api/schools/:id/admin-password   body: { adminId, password }  (admin password bhool jaye to reset)
export const resetAdminPassword = asyncHandler(async (req, res) => {
  const { adminId, password } = req.body;
  if (!password || password.length < 6) throw new ApiError(400, "Password must be at least 6 characters");
  const admin = await User.findOne({ _id: adminId, schoolId: req.params.id, role: "admin" });
  if (!admin) throw new ApiError(404, "Admin not found");
  admin.password = password;
  await admin.save();
  res.json({ success: true, message: "Password reset" });
});
