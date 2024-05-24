import mongoose from "mongoose";

const mongodbURL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export { connectDB };
