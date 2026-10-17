import { ApiError } from "../utils/ApiError.js";

// School-level routes pe lagao. Isse req.schoolId milta hai jo HAR query mein lagna chahiye.
// Controllers mein kabhi body/params se schoolId mat lo, sirf req.schoolId use karo.
export const tenant = (req, res, next) => {
  if (!req.user?.schoolId) throw new ApiError(403, "School context required");
  req.schoolId = req.user.schoolId;
  next();
};
