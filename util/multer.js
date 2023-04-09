import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: process.env.ENV });

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAssessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAssessKey,
  },
});
//multer
const storageEngine = multerS3({
  s3: s3,
  bucket: bucketName,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: async function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 10000)}`;
    const filename = `${uniqueSuffix}-${file.originalname}`;
    cb(null, filename);
  },
});

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};
const upload = multer({
  storage: storageEngine,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

export { upload };
