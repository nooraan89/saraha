 

export const validatonmidelwers =(schema)=>{
return(req,res,next)=>{
const  data={...req.body,...req.params,...req.query};
const results = schema.validate(data,{abortEarly:false});

if(results.error){
    const errorMessages = results.error.details.map((obj)=>{obj.message});
    return next(new Error(errorMessages,{cause:400}));
}console.log("uuu");
return next();

};

};