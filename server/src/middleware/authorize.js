// Role check: sirf unhi roles ko ijazat jo yahan likhe hon
// Istemal: router.post("/", protect, authorize("admin"), createStudent)
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // protect pehle chal chuka hota hai, is liye req.user maujood hai
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      const error = new Error("Aap ko ye kaam karne ki ijazat nahi");
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
};