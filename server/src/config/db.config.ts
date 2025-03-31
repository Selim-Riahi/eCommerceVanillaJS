import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI must be defined in environment variables");
    }

    // Strict connection settings
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: "majority",
    });

    // Type-safe connection verification
    if (!mongoose.connection.db) {
      throw new Error(
        "MongoDB connection established but database instance is missing"
      );
    }

    // Verify connection with ping
    await mongoose.connection.db.admin().ping();
    console.log("✅ MongoDB connected and verified successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

export default connectDB;
