// fileFilter Configuration
const fileFilter = (req, file, callback) => {
    if(file?.mimetype?.startsWith("image/") || file?.mimetype?.endsWith("/pdf")){
        // accept image or document type of files only.
        callback(null, true)
    }else{
        const custom_error = new Error("Only images or documents are allowed!");
        custom_error.code = "INVALID_FILE_TYPE";
        callback(custom_error, false)
    }
}

module.exports = fileFilter;