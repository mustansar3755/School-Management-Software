import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Security headers lagane ke liye
app.use(helmet());

// Sirf apne frontend ko ijazat, credentials:true taake cookie (refresh token) chal sake
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Request body (JSON) parhne ke liye
app.use(express.json());

// Cookie parhne ke liye (refresh token yahin se milega)
app.use(cookieParser());

// Har IP se 15 min mein max 300 requests (spam/brute force se bachao)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    message: { success: false, message: "Bohat zyada requests, thori der baad try karo" },
  })
);

// Test route: server chal raha hai ya nahi
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API chal rahi hai" });
});

// Routes (baqi modules Step 4 se aate jayenge)
app.use("/api/auth", authRoutes);

// Sab se last mein: pehle 404, phir central error handler
app.use(notFound);
app.use(errorHandler);

export default app;