import jwt from "jsonwebtoken";
import User from "../models/User.js";
import School from "../models/School.js";

// Helper: status code ke saath error banao
const makeError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Login check: token verify, user load, school blocked check
export const protect = async (req, res, next) => {
  try {
    // 1. Header se token nikalo: "Authorization: Bearer <token>"
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      throw makeError("Login required", 401);
    }
    const token = header.split(" ")[1];

    // 2. Token verify (galat ya expire ho to khud error phenk dega)
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // 3. User database se load karo
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      throw makeError("This account not exist or blocked", 401);
    }

    // 4. Agar school user hai to school block to nahi
    if (user.schoolId) {
      const school = await School.findById(user.schoolId);
      if (!school) {
        throw makeError("School not found", 401);
      }
      if (school.isBlocked) {
        throw makeError(
          `Your School is blocked. ${school.blockReason || ""}`.trim(),
          403
        );
      }
    }

    // 5. Aage ke middleware/controller ke liye user rakh do
    req.user = user;
    next();
  } catch (error) {
    // Express ke error handler ko bhej do
    next(error);
  }
};