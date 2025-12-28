const { fileLimitSize } = require("../constants");

// This middleware will be used for file uploads which checks if the file size was surpass the limit then terminate the file upload immediately
const terminateFileUploadWhenSizeLimitHit = (req, res, next) => {
    const fileSize = parseInt(req.headers['content-length']);
    console.log("file size: ",fileSize)

    if (fileSize > fileLimitSize) {
        // Destroy the socket to stop the upload immediately
        req.connection.destroy(); 
        return res.status(413).json({ error: "File too large", error_code: "LIMIT_FILE_SIZE" });
    }
    next();
};

module.exports = terminateFileUploadWhenSizeLimitHit;