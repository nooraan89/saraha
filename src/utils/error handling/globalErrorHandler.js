export const  globalError =(Error,req,res,next)=>{
    const status=Error.cause||500;
    
    return res.status(status).json({messages:Error.messages,stack:Error.stack})}