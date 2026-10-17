import mongoose from "mongoose";

// MongoDB Atlas se connect karne ka function
const connectDB = async () => {
  try {
    // MONGO_URI .env se aa raha hai
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection fail:", error.message);
    // DB ke baghair server ka koi faida nahi, is liye band kar do
    process.exit(1);
  }
};

export default connectDB;