import mongoose from "mongoose";

/**
 * Cache connection across serverless invocations on Vercel using global.mongoose
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}    

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error(
      "Missing MongoDB connection string: Please define the MONGO_URI environment variable in your .env or Vercel project settings."
    );
  }

  // If already connected and ready, return the cached connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Immediately fail queries instead of buffering for 10000ms if disconnected
    };

    cached.promise = mongoose.connect(mongoURI, opts).then((mongooseInstance) => {
      console.log("MongoDB connected successfully");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset promise on failure so subsequent requests can retry
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }

  return cached.conn;
};

export default connectDB;
