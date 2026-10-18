// Tenant middleware: req.schoolId set karta hai (sirf token wale user se)
// Istemal: router.use(protect, tenant) phir controllers mein req.schoolId
export const tenant = (req, res, next) => {
  // Super Admin ka schoolId null hota hai, wo school ke data routes pe nahi aa sakta
  if (!req.user || !req.user.schoolId) {
    const error = new Error("Is kaam ke liye kisi school ka account chahiye");
    error.statusCode = 403;
    return next(error);
  }

  // Controllers mein schoolId SIRF yahin se lena (req.schoolId)
  req.schoolId = req.user.schoolId;
  next();
};