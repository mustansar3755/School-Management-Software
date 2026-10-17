import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "School name required"],
      trim: true,
    },
    // Login pe use hone wala code: SCH-0001, SCH-0002... (controller auto banayega)
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    address: { type: String, trim: true },
    phone: { type: String, trim: true },

    // free = 50 students + 5 teachers limit, pro = unlimited
    plan: { type: String, enum: ["free", "pro"], default: "free" },

    // Block system: block ho to us school ka koi user login/request nahi kar sakta
    isBlocked: { type: Boolean, default: false },
    blockReason: { type: String, default: "" },
  },
  { timestamps: true }, // createdAt aur updatedAt khud ban jayenge
);
export default mongoose.model("School", schoolSchema);
