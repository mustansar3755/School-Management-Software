import jwt from "jsonwebtoken";

export const signAccessToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, schoolId: user.schoolId || null },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_EXPIRES || "15m" }
  );

export const signRefreshToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: `${process.env.REFRESH_EXPIRES_DAYS || 7}d`,
  });

export const refreshCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: (Number(process.env.REFRESH_EXPIRES_DAYS) || 7) * 24 * 60 * 60 * 1000,
  path: "/api/auth",
});
