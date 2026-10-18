import jwt from "jsonwebtoken";
import User from "../models/User.js";
import School from "../models/School.js";
import {
  generateAccessToken,
  generateRefreshToken,
  refreshCookieOptions,
} from "../utils/generateToken.js";

// Helper: status code ke saath error banao
const makeError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Frontend ko user ka wohi data bhejo jo zaroori hai (password kabhi nahi)
const userResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  schoolId: user.schoolId,
});

// POST /api/auth/login  { schoolCode?, email, password }
export const login = async (req, res, next) => {
  try {
    const { schoolCode, email, password } = req.body;

    if (!email || !password) {
      throw makeError("Email aur password dono zaroori hain", 400);
    }

    let school = null;
    let user;

    if (schoolCode) {
      // School user: pehle school dhoondo, phir us school ke andar user
      school = await School.findOne({ code: schoolCode.trim().toUpperCase() });
      if (!school) throw makeError("School code galat hai", 401);

      if (school.isBlocked) {
        throw makeError(`Aap ka school block hai. ${school.blockReason || ""}`.trim(), 403);
      }

      user = await User.findOne({ schoolId: school._id, email: email.toLowerCase() }).select("+password");
    } else {
      // Super Admin: schoolCode nahi, schoolId null aur role superadmin
      user = await User.findOne({
        schoolId: null,
        role: "superadmin",
        email: email.toLowerCase(),
      }).select("+password");
    }

    // Email ya password galat: ek hi message (taake pata na chale kaun sa galat tha)
    if (!user || !(await user.comparePassword(password))) {
      throw makeError("Email ya password galat hai", 401);
    }

    if (!user.isActive) {
      throw makeError("Ye account band hai, admin se rabta karo", 403);
    }

    // Tokens banao: refresh token cookie mein, access token response mein
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    res.json({
      success: true,
      accessToken,
      user: userResponse(user),
      school: school ? { id: school._id, name: school.name, code: school.code, plan: school.plan } : null,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/refresh  (cookie se refresh token, body ki zaroorat nahi)
export const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) throw makeError("Dobara login karo", 401);

    // Verify: galat ya expire ho to error khud phenk dega
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // User DB se load karo (latest role/schoolId ke liye)
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) throw makeError("Ye account maujood nahi ya band hai", 401);

    // School blocked to nahi
    let school = null;
    if (user.schoolId) {
      school = await School.findById(user.schoolId);
      if (!school || school.isBlocked) {
        throw makeError("Aap ka school block hai", 403);
      }
    }

    res.json({
      success: true,
      accessToken: generateAccessToken(user),
      user: userResponse(user),
      school: school ? { id: school._id, name: school.name, code: school.code, plan: school.plan } : null,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout
export const logout = (req, res) => {
  // clearCookie mein maxAge nahi dena, baqi options wahi jo cookie set karte waqt thay
  const { maxAge, ...options } = refreshCookieOptions;
  res.clearCookie("refreshToken", options);
  res.json({ success: true, message: "Logout ho gaye" });
};