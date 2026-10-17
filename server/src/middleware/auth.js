import jwt from "jsonwebtoken";
import User from "../models/User.js";
import School from "../models/School.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// 1) Token verify + user load + school status check
export const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
  if (!token) throw new ApiError(401, "Login required");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch {
    throw new ApiError(401, "Session expired");
  }

  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) throw new ApiError(401, "Account not found or disabled");

  if (user.role !== "superadmin") {
    const school = await School.findById(user.schoolId).select("status blockedReason");
    if (!school) throw new ApiError(401, "School not found");
    if (school.status === "blocked") {
      throw new ApiError(403, school.blockedReason || "Your school account is blocked. Contact support.", { code: "SCHOOL_BLOCKED" });
    }
  }

  req.user = user;
  next();
});

// 2) Role guard: authorize("admin", "teacher")
export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) throw new ApiError(403, "You do not have permission for this action");
  next();
};
