import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const ROLES = ["superadmin", "admin", "teacher", "accountant", "parent"];

const userSchema = new mongoose.Schema(
  {
    // superadmin ka schoolId null hota hai, baaki sab ka required
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", default: null, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ROLES, required: true },
    isActive: { type: Boolean, default: true },
    lastLoginAt: Date,
  },
  { timestamps: true }
);

// Email har school ke andar unique hai (same email 2 schools mein ho sakti hai)
userSchema.index({ schoolId: 1, email: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model("User", userSchema);
