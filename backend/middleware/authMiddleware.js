import jwt from "jsonwebtoken";

const secretKey = "your-secret-key"; // Khóa bí mật để ký JWT, bạn nên lưu khóa này ở file .env

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Lấy token từ header Authorization

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: "Bạn cần đăng nhập để truy cập tài nguyên này",
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Xác minh token
    req.user = decoded; // Lưu thông tin người dùng vào req để sử dụng sau
    next();
  } catch (error) {
    return res.status(403).json({
      code: 403,
      message: "Token không hợp lệ hoặc đã hết hạn",
    });
  }
};

export default authenticateJWT;
