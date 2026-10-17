import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Ek hi User model sab ke liye: superadmin, admin, teacher, accountant, parent
const userSchema = new mongoose.Schema(
  {
    // Super Admin ka schoolId null hota hai, baqi sab ka lazmi
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", default: null },

    name: { type: String, required: [true, "Name required"], trim: true },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },

    // select:false => query mein password default nahi aata (security)
    password: { type: String, required: true, minlength: 6, select: false },

    role: {
      type: String,
      enum: ["superadmin", "admin", "teacher", "accountant", "parent"],
      required: true,
    },

    // Account band karna ho (jaise teacher chala gaya) to false
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Email sirf apne school ke andar unique (do schools mein same email chal sakti hai)
userSchema.index({ schoolId: 1, email: 1 }, { unique: true });

// Save se pehle password hash karo (sirf tab jab password naya ya badla ho)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Login pe password match karne ke liye
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

export default mongoose.model("User", userSchema);