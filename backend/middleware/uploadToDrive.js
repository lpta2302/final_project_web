import drive from "../config/googleDrive.js";
import fs from "fs";

async function uploadToDrive(req, res, next) {
  try {
    const filePath = req.file.path;
    const folderId = "1CmrmFj8DSW0Hqsm1HfiW22CUthH4PFko"; // ID của thư mục đích

    console.log(filePath);

    const authorization = await drive();
    if (!authorization) {
      return res
        .status(500)
        .json({ message: "Unable to authorize Google Drive" });
    }

    // Tải file lên Google Drive vào thư mục đích
    const response = await authorization.files.create({
      requestBody: {
        name: req.file.originalname,
        mimeType: req.file.mimetype,
        parents: [folderId], // Chỉ định thư mục đích
      },
      media: {
        mimeType: req.file.mimetype,
        body: fs.createReadStream(filePath),
      },
    });

    console.log("RP:" + response);

    const fileId = response.data.id;

    // Cấp quyền xem công khai cho file nhưng không cho phép chỉnh sửa
    await authorization.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader", // Quyền xem (không chỉnh sửa)
        type: "anyone", // Công khai cho mọi người
      },
    });

    // Lấy URL công khai để xem file
    req.imageUrl = `https://drive.google.com/uc?id=${fileId}&export=view`;

    // Xóa file tạm
    fs.unlinkSync(filePath);

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

export default uploadToDrive;
