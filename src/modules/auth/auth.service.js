import UserModel from "../../db/modeles/user.model.js";
import jwt from "jsonwebtoken";
import {eventemitter} from "../../utils/email/EmailEvents.js"
import { hash } from "../../utils/hashing/hashing.js"
import { compare } from "../../utils/hashing/hashing.js";
import { encrypt } from "../../utils/encryption/encryption.js";
import { sendEmail } from "../../utils/email/sendEmail.js";
import bcrypt from "bcrypt";
import  {signUp} from "../../utils/email/generetHtml.js";
import {subject} from "../../utils/email/sendEmail.js"
import { nanoid } from "nanoid";
export const register=async(req,res,next)=>{
    const {username,email,password,confirmpassword,phone}=req.body;
 if (password!=confirmpassword)
    {return next(new Error("password not match",{cause:400}))}
  const checkuser=await UserModel.findOne({email})
if(checkuser)
    return next(new Error("user already existe!",{cause:400}));
  const hashpassword= bcrypt.hashSync(password,10);
  
const encryptphone = encrypt({data:phone,signuture: process.env.SECRET});
 
    const user = await UserModel.create({username,email,confirmpassword,password:hashpassword,phone:encryptphone})
   eventemitter.emit("sendEmail",email,username,user._id);

     return res.status(201).json({sacces:true,message:"user created successufully!"});
    }
    ////////////////////////////////////////////////////////////////////
 export const login=async(req,res,next)=>{

const{email,password}=req.body;
const user=await UserModel.findOne({email})
if(!user){
    return res.status(404).json({succes:false,message:"user does not exists"})}
    if(user.isConfirmed==false)
        return next(new Error("please cofirm you email",{cause:403}))
const match= bcrypt.compareSync(password,user.password);
    if (!match)
        return next(new Error ("password is not correct"),{cause:400})
   const token = jwt.sign({ _id: user._id },
    user.role==="user"?process.env.SECRET_USER:process.env.SECRET_ADMIN,
    {expiresIn:"1d"})
     if(user.isdeleted==="true"){user.isdeleted="false";await user.save()}
        return res.status(200).json({succes:true,message:"done",token})
    }


////////////////////////////////////////////////////////////////////////////
export const confermeEmail =async(req,res,next)=>{
  const {code,email}=req.body;
  const user =await UserModel.findOne({email});
  if(!user)
      return next(new Error("user not exist",{cause:404}))
    
     // if(user.isConfirmed==="true")
      //    return  next (new Error("email already verified",{cause:409}))
     console.log(user.confirmEmailotb)
     console.log(code);
      const check=bcrypt.compareSync(code,user.confirmEmailotb)
      console.log(check)
   if(!check)
      return next(new Error("invalid code",{cause:400}))
  await UserModel.findOne({email})
    
      
await UserModel.updateMany({isConfirmed:true,$unset:{confirmEmailotb:""}})
  return res.status(200).json({success:true,message:"user verified successfully"})
  }
  /////////////////////////////////////////////////////////////
  export const forget_password=async(req,res,next)=>{
  const {email}=req.body;
  const user=await UserModel.findOne({email})
  if (!user)
      return  next(new Error("usernot exist",{cause:404}));
  eventemitter.emit("forgetPassword",user.email,user.username,user._id)
  return res.status(200).json({message:"done"})
  
  }
  //////////////////////////////////////////////////////////////
  export const reset_password =async(req,res,next)=>{
      const {code,password,email}=req.body;
      const user=await UserModel.findOne({email,isdeleted:false})
      if(!user)
          return  next(new Error("user not found",{cause:404}))
      const check=bcrypt.compareSync(code,user.forgetEmailotb);
      if(!check)
          return next(new Error("invalid code",{cause:409}));
      
     const  hashpassword=bcrypt.hashSync(password,10);
     console.log(hashpassword)
   await UserModel.updateMany( {password:hashpassword,$unset:{forgetpasswordotp:""}})
   return res.status(201).json({message:"password updateted successfully",result:user})
}
  
  ///////////////////////////////////////////////////////////
  export const refreshToken=async()=>{
      const {authorization}=req.header;
  const user=await decodedToken({
  authorization,
  tokenType : tokenTypes.refresh,
  next
  })
      const access_token = token({data:{id:user._id},secretkey:
          user.role===rolesType.user?
          process.env.TOKEN_ACCESS_USER
          :process.env.TOKEN_ACCESS_ADMIN,
          options:{expiresIn:process.env.EXPIER_ACCESS}})
      const refresh_token = token({data:{id:user.id},secretkey:
          user.role===rolesType.user?
          process.env.TOKEN_REFRESH_USER
          :process.env.TOKEN_REFRESH_ADMIN,
      options:{expiresIn:process.env.EXPIER_REFRESH}})
  return res.status(200).json({access:true,results:{access_token,refresh_token}})
  
  
  
  }