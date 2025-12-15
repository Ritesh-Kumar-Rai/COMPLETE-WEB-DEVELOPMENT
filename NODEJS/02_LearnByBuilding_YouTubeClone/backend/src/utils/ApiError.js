// API related Custom ERROR class

class ApiError extends Error{
    constructor(statusCode, message="Oops something went wrong!", errors=[], stack=''){
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
        this.data = null;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
};

export {ApiError};