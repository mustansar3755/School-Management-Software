import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const email = process.env.SUPERADMIN_EMAIL.toLowerCase();
  const exists = await User.findOne({ schoolId: null, email });
  if (exists) {
    console.log("Super admin already exists:", email);
  } else {
    await User.create({
      name: process.env.SUPERADMIN_NAME,
      email,
      password: process.env.SUPERADMIN_PASSWORD,
      role: "superadmin",
      schoolId: null,
    });
    console.log("Super admin created:", email);
  }
  await mongoose.disconnect();
};

run().catch((e) => { console.error(e); process.exit(1); });
