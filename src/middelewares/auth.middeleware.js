import  jwt  from "jsonwebtoken";
import UserModel from "../db/modeles/user.model.js";
import { asyncHandler } from "../utils/error handling/asyncHandler.js";

export const rolestypes={admin:"admin",user:"user"}
export const authentication =async(req,res,next)=>{
    try{
    const {authorization}=req.headers;
    if(!authorization)
        return next(new Error("authorize token is required",{cause:401}));
    const [bearer,token]=authorization.split(" ");
    console.log(token ,bearer)
    let secretkey;
    if(bearer==="user"){secretkey=process.env.SECRET_USER}
    else{secretkey=process.env.SECRET_ADMIN}
    console.log(secretkey)
    const decoded=jwt.verify(token,secretkey);
     console.log(decoded)

    const user=await UserModel.findById(decoded._id);
    console.log(user)
    if(!user)
    return next(new Error("user not found",{cause:404}))
    if(user.changedAt?.getTime()>=decoded.iat*1000)
        return next(new Error("pleese log in again",{cause:401}))
    if (user.isdeleted==true)return next(new Error("pleese log in again",{cause:401}))
    req.user=user;
    return next()
    }catch(error){next(error)}
    
};
export const allowTo=((roles=[])=>{
return (req,res,next)=>{

if(!roles.includes(req.user.role))
    return next(new Error("forbidden account",{cause:400}));
return next();

}

});