import { Router } from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  listSchools, schoolStats, createSchool, getSchool,
  updateSchool, setSchoolStatus, setSchoolPlan, resetAdminPassword,
} from "../controllers/school.controller.js";

const router = Router();

// Ye saare routes sirf Super Admin (aap) ke liye hain
router.use(protect, authorize("superadmin"));

router.get("/stats", schoolStats);
router.route("/").get(listSchools).post(createSchool);
router.route("/:id").get(getSchool).patch(updateSchool);
router.patch("/:id/status", setSchoolStatus);
router.patch("/:id/plan", setSchoolPlan);
router.patch("/:id/admin-password", resetAdminPassword);

export default router;
