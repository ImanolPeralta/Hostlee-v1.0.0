// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isImage = file.mimetype.startsWith("image/");
//     const dir = isImage
//       ? path.join("uploads", "bookings")
//       : path.join("uploads", "documents");

//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     cb(null, dir);
//   },

//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// export const upload = multer({ storage });

// export const uploadDocuments = upload.fields([
//   { name: "id", maxCount: 1 },
//   { name: "address", maxCount: 1 },
//   { name: "statement", maxCount: 1 },
// ]);
