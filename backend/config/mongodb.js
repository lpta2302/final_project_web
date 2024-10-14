import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL_ari);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB", error);
    process.exit(1); // Thoát chương trình nếu có lỗi
  }
};

export default connectDB;
