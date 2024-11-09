import multer from 'multer';
import drive from "../config/googleDrive.js";
import fs from "fs";

// Use memory storage for multer instead of disk storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function uploadToDrive(req, res, next) {
  try {
    const files = req.files;
    const folderId = "1CmrmFj8DSW0Hqsm1HfiW22CUthH4PFko";

    const authorization = await drive();
    if (!authorization) {
      return res.status(500).json(false);
    }

    if (!files || files.length === 0) {
      req.imageUrls = [];
      return next();
    }

    req.imageUrls = [];

    for (const file of files) {
      // Upload directly from memory without writing to the file system
      const response = await authorization.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: file.mimetype,
          parents: [folderId],
        },
        media: {
          mimeType: file.mimetype,
          body: fs.createReadStream(file.buffer), // Use the buffer instead of file path
        },
      });

      const fileId = response.data.id;

      await authorization.permissions.create({
        fileId: fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      const imageUrl = `https://drive.google.com/thumbnail?id=${fileId}`;
      req.imageUrls.push(imageUrl);
    }

    next();
  } catch (error) {
    res.status(500).json(error);
  }
}

export default uploadToDrive;
