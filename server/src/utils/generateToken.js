import jwt from "jsonwebtoken";

// Access token: chhota (15 min), JWT mein id, role aur schoolId
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, schoolId: user.schoolId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

// Refresh token: lamba (7 din), is mein sirf id (naya access token banane ke liye kaafi hai)
export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// Refresh token cookie ki settings (login, refresh aur logout teeno mein use hongi)
export const refreshCookieOptions = {
  httpOnly: true, // JavaScript se cookie nahi parh sakte (XSS se bachao)
  secure: process.env.NODE_ENV === "production", // production mein sirf HTTPS
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din (milliseconds mein)
};