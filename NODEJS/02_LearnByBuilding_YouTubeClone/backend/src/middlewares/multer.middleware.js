import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname); // returns extension .png/ .jpeg/ .mp4 etc.
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // returns unique name for file

    cb(null, file.fieldname + '-' + uniqueSuffix+extension);
  }
})

const upload = multer({ storage: storage });

export default upload;