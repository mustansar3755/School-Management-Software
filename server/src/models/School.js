import mongoose from "mongoose";

export const PLANS = {
  free: { studentLimit: 50, teacherLimit: 5 },
  pro: { studentLimit: 100000, teacherLimit: 100000 }, // practically unlimited
};

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true }, // e.g. SCH-0001
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    logo: { type: String, default: "" },
    plan: { type: String, enum: Object.keys(PLANS), default: "free" },
    studentLimit: { type: Number, default: PLANS.free.studentLimit },
    teacherLimit: { type: Number, default: PLANS.free.teacherLimit },
    status: { type: String, enum: ["active", "blocked"], default: "active" },
    blockedReason: { type: String, default: "" },
    subscriptionEndsAt: { type: Date, default: null }, // null = no expiry (free)
  },
  { timestamps: true }
);

schoolSchema.index({ name: "text", city: "text", code: "text" });

export default mongoose.model("School", schoolSchema);
