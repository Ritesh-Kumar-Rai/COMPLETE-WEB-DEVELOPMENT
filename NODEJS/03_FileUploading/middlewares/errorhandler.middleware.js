const multer = require("multer");

// middleware for global error handling [multer related error also]
const errorHandler = (error, req, res, next) => {
    if(error instanceof multer.MulterError){
        return res.status(400).send(`Unexpected Error while uploading file: \n[${error.code}] ${error.name} -> ${error.message}`);
    }else if(error){
        return res.status(400).send(`Server Error: ${error.name} -> ${error.message}`);
    }
    next();
};

module.exports = errorHandler;