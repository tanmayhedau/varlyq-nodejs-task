import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB is connected successfully ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;