import UserModel from "../../db/modeles/user.model.js";
import jwt from "jsonwebtoken";
import CryptoJS from"crypto-js";
import { decrypt } from "../../utils/encryption/encryption.js";
//import eventemitter from "../../utils/email/EmailEvents.js"
import  bcrypt, { hash }  from "bcrypt";
export const profile =async(req,res)=>{

const {user}=req;
console.log(user)
//user.phone=decrypt({data:user.phone,signuture: process.env.SECRET});

return res.status(200).json({success:true,message:"done",results:user});
}
////////////////////////////////////////////////////////////////////////
export const updateProfile =async(req,res,next)=>{
     
const user=await UserModel.findByIdAndUpdate(req.user._id,{...req.body},{new:true,runValidators:true}) 
return res.status(200).json({satck:true,message:"profile updated successfully!!",result:user})

}
///////////////////////////////////////////////////////////////////////////////
export const deactivAteaccount=async(req,res,next)=>{
    const user=await UserModel.findByIdAndUpdate(req.user._id,{isdeleted:true,changedAt:Date.now()},{new:true,runValidators:true})
return res.status(200).json({satck:true,message:"account deactivated successfully"})
}
////////////////////////////////////////////////////////////////////////////////////
export  const chandgePassword =async(req,res,next)=>{
    const {oldpassword,password}=req.body;
    const match=bcrypt.compareSync(oldpassword,req.user.password);
    if(!match)return next(new Error("oldpassword is not correct!",{cause:400}))
        const hashpassword=bcrypt.hashSync(password,10)
const updateuser = await UserModel.findByIdAndUpdate(req.user._id,{password:hashpassword,changedAt:Date.now()},{new:true,runvalidation:true})
return res.status(200).json({success:true,message:"pssword changede successfully",results:{user:updateuser}});
}

