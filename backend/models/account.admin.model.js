const mongoose = require("mongoose");

// Định nghĩa schema cho ACCOUNT
const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Đảm bảo username không bị trùng lặp
      trim: true, // Loại bỏ khoảng trắng thừa
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Đảm bảo email không trùng
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"], // Kiểm tra định dạng email
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Số điện thoại không hợp lệ"], // Kiểm tra định dạng số điện thoại
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    accountStatus: {
      type: String,
      required: true,
      enum: ["active", "inactive", "suspended"], // Trạng thái tài khoản có thể là 3 giá trị này
      default: "inactive", // Giá trị mặc định
    },
    accountCode: {
      type: String,
      required: true,
      unique: true, // Đảm bảo mã tài khoản là duy nhất
      trim: true,
    },
  },
  { timestamps: true }
); // Tự động thêm createdAt và updatedAt

// Tạo model từ schema
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
