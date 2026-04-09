const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected Successfully to Atlas: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn(`⚠️ The Node server is running in offline-fallback mode since the DB is unavailable.`);
    // Intentionally removed process.exit(1) to prevent constant application crashes
  }
};

module.exports = connectDB;
