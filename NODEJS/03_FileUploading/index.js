const express = require("express");
const multer = require("multer");
const chunkspying = require("./middlewares/chunkspying.middleware");
const storage = require("./middlewares/multer.middleware");
const fileSizeLimitConfig = require("./configurations/multerfilesize_limit.config");
const fileFilter = require("./configurations/multer_filefilter.config");
const errorHandler = require("./middlewares/errorhandler.middleware");
const terminateFileUploadWhenSizeLimitHit = require("./middlewares/fileupload_terminator.middleware");

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

// use the above middleware as global
app.use(errorHandler);


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


app.post("/api/v2/upload", chunkspying, terminateFileUploadWhenSizeLimitHit, upload.single('file'), (req, res) => {
    console.log("Upload Complete. File saved at:", req.file, req.file.path);
    res.send("File received and merged! `"+req.file.originalname + "` uploaded successfully.");
});


app.post("/api/v3/upload", 
    // terminateFileUploadWhenSizeLimitHit,
    chunkspying,
    upload.array("gallery", 5), // users can upload same field files upto 5
    (req, res) => {
        const files = req.files;
        if(!files || !files.length){
            return res.status(400).json({
                status: 400,
                message: "Oops! file is not uploaded!",
                success: false
            });
        }

        // success
        return res.status(201).json({
            status: 201,
            message: "files are successfully created.",
            success: true,
            uploaded_files: files
        });

    }
);


app.post("/api/v4/upload", terminateFileUploadWhenSizeLimitHit, chunkspying,
    upload.fields([{name: 'avatar', maxCount: 1}, {name: 'documents', maxCount: 2}]),
    (req, res) => {
        const avatar = req.files['avatar'];
        const documents = req.files['documents'];
        
        if(!avatar || !avatar.length){
            return res.status(400).json({
                status: 400,
                message: "Oops! avatar image is not uploaded!",
                success: false
            });
        }

        if(!documents || !documents.length){
            return res.status(400).json({
                status: 400,
                message: "Oops! documents is not uploaded!",
                success: false
            });
        }

        // success
        return res.status(201).json({
            status: 201,
            message: "files are successfully uploaded.",
            success: true,
            uploaded_files: req?.files
        });
    }
)



// start a server
app.listen(PORT, ()=>{
    console.log(`⚙️ Server started serving at http://localhost:${PORT}`);
});