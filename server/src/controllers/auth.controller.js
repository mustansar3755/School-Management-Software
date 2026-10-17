import jwt from "jsonwebtoken";
import User from "../models/User.js";
import School from "../models/School.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { signAccessToken, signRefreshToken, refreshCookieOptions } from "../utils/tokens.js";

const publicUser = (u, school) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
  schoolId: u.schoolId,
  school: school ? { id: school._id, name: school.name, code: school.code, plan: school.plan, logo: school.logo } : null,
});

// POST /api/auth/login
// Super admin: email + password
// School users: email + password + schoolCode (taake 2 schools ki same email alag rahe)
export const login = asyncHandler(async (req, res) => {
  const { email, password, schoolCode } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password are required");

  let school = null;
  let schoolId = null;

  if (schoolCode) {
    school = await School.findOne({ code: schoolCode.trim().toUpperCase() });
    if (!school) throw new ApiError(401, "Invalid school code, email or password");
    schoolId = school._id;
  }

  const user = await User.findOne({ email: email.toLowerCase().trim(), schoolId }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, "Invalid school code, email or password");
  }
  if (!user.isActive) throw new ApiError(403, "Your account is disabled");

  if (school && school.status === "blocked") {
    throw new ApiError(403, school.blockedReason || "Your school account is blocked. Contact support.", { code: "SCHOOL_BLOCKED" });
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  res.cookie("refreshToken", signRefreshToken(user), refreshCookieOptions());
  res.json({ success: true, accessToken: signAccessToken(user), user: publicUser(user, school) });
});

// POST /api/auth/refresh  (httpOnly cookie se naya access token)
export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) throw new ApiError(401, "Session expired, please login again");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw new ApiError(401, "Session expired, please login again");
  }

  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) throw new ApiError(401, "Account not found or disabled");

  let school = null;
  if (user.role !== "superadmin") {
    school = await School.findById(user.schoolId);
    if (!school || school.status === "blocked") {
      throw new ApiError(403, school?.blockedReason || "Your school account is blocked. Contact support.", { code: "SCHOOL_BLOCKED" });
    }
  }

  res.json({ success: true, accessToken: signAccessToken(user), user: publicUser(user, school) });
});

// POST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken", { ...refreshCookieOptions(), maxAge: undefined });
  res.json({ success: true, message: "Logged out" });
});

// PATCH /api/auth/password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters");
  }
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.matchPassword(currentPassword))) throw new ApiError(400, "Current password is wrong");
  user.password = newPassword;
  await user.save();
  res.json({ success: true, message: "Password updated" });
});
