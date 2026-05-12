const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      console.log("❌ MONGODB_URI not found in .env");
      process.exit(1);
    }

    console.log("🔄 Connecting to MongoDB Atlas...");

    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("disconnected", () => {
      console.log("⚠ MongoDB disconnected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("❌ MongoDB error:", err.message);
    });

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;