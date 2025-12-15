// Middleware

const asyncHandler = (requestHandlerFunc) => {
    return (req, res, next) => {
        Promise.resolve(requestHandlerFunc(req,res,next)).catch((err) => next(err))
    }
};

export {asyncHandler};