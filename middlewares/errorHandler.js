const errorHandler= (err, req,res,next)=>{
    console.log("Error Ocurred", err.stack|| err);
    const statusCode= err.statusCode || 500;
    const message= err.message || "Internal server error";
    res.status(statusCode).json({message, error: process.env.NODE_ENV=="development"? err: undefined})
}
module.exports= errorHandler