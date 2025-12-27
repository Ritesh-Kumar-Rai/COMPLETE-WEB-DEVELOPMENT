const crypto = require("crypto");
const multer = require("multer");
const path = require("path");

// middleware to upload an file probably image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, bytes) => {
        if(err){
            throw new Error(`Server error: ${err}`);
        }

        console.log("FROM MULTER MIDDLEWARE, file params contains:\n", file);

        const uniqueSuffixWithExtension = bytes?.toString("hex") + path?.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffixWithExtension)
    });
  }
})

module.exports = storage;