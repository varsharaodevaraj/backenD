const asyncHandler = (requestfunc) => {
    return (req,res,next) => {
        Promise.resolve(requestfunc(req,res,next)).catch((err) => next(err))
    }
}

export default asyncHandler