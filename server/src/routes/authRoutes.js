import express from "express";
import rateLimit from "express-rate-limit";
import { login, refresh, logout } from "../controllers/authController.js";

const router = express.Router();

// Login pe sakht limit: ek IP se 15 min mein sirf 10 koshish (password guess karne se bachao)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Bohat zyada login koshishen, 15 min baad try karo" },
});

// URL -> controller mapping (logic yahan nahi, sirf raasta)
router.post("/login", loginLimiter, login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;