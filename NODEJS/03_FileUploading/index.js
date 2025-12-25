const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const app = express();
const PORT = 3800;

// middleware to check at what time from where the request was coming
app.use(function(req, res, next){
    const current_date_time = new Date().toISOString();
    console.log(`[${current_date_time}] -> ${req?.method} : ${req?.url}`);
    next();
});

// middleware to serve the static files
app.use("/public", express.static("public"));


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

// middleware for global error handling [multer related error also]
const errorHandler = (error, req, res, next) => {
    if(error instanceof multer.MulterError){
        return res.status(400).send(`Unexpected Error while uploading file: \n${error.name} -> ${error.message}`);
    }else if(error){
        return res.status(400).send(`Server Error: ${error.name} -> ${error.message}`);
    }
    next();
};

// use the above middleware as global
app.use(errorHandler);

// file size limit config
const fileSizeLimitConfig = {
    fileSize: 1024 * 1024 * 10 // 1024KB * 1024KB = 1MB; 1MB * 10 = 10MB [total size limit] 
};

// fileFilter Configuration
const fileFilter = (req, file, callback) => {
    if(file?.mimetype?.startsWith("image/") || file?.mimetype?.endsWith("/pdf")){
        // accept image or document type of files only.
        callback(null, true)
    }else{
        callback(new TypeError("Only images or documents are allowed!"), false)
    }
}

const upload = multer({
    storage: storage,
    limits: fileSizeLimitConfig,
    fileFilter: fileFilter      
})

// API endpoints for different route
app.get("/api/v1/namaste", (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            message: "Hare Krsna, API is working",
            success: true
        });
    } catch (error) {
        console.error(`[Error from GET api endpoint]: ${error.name} -> ${error.message}`);
    }
});

app.post("/api/v1/upload", upload.single("file"), (req, res)=>{
    const file = req?.file;
    console.log(file)
});


app.post('/upload', (req, res, next) => {
    // A middleware for calculating or monitoring a chunks of file which was receiving
    let received = 0;
    let count = 1;
    const total = req.headers['content-length'];

    req.on('data', (chunk) => {
        received += chunk.length;
        count += 1;
        const percentage = ((received / total) * 100).toFixed(2);
        console.log(`${count}. Receiving chunks... Progress: ${percentage}% (${received} bytes) [each-chunk size: ${chunk.length}]`);
    });

    next(); // Pass to Multer after setting up the listener
}, upload.single('file'), (req, res) => {
    console.log("Upload Complete. File saved at:", req.file, req.file.path);
    res.send("File received and merged! `"+req.file.originalname + "` uploaded successfully.");
});



// start a server
app.listen(PORT, ()=>{
    console.log(`⚙️ Server started serving at http://localhost:${PORT}`);
});