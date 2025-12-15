// API response related custom class: to get api response in a generalized way 

class ApiResponse{
    constructor(statusCode, data=[], message = "API response Success"){
        this.name = "ApiResponse";
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
};

export {ApiResponse};