import EventEmitter from "events";
import { customAlphabet, nanoid } from "nanoid"
import { sendEmail } from "./sendEmail.js";
import { hash } from "../hashing/hashing.js";
import UserModel from "../../db/modeles/user.model.js";
import {signUp} from "./generetHtml.js"
//import { updateEmail } from "../../../../social/src/modules/user/user.service.js";
import bcrypt from "bcrypt";
export const eventemitter =new EventEmitter();
const subject={
  verifyEmail:"verifyEmail",
  updateEmail:"updateEmail",
  resetpassword:"resetpassword"
}
/////////////////////////////////////////////////////////////
    eventemitter.on("sendEmail",async(email,username,id)=>{
      
      const user=await UserModel.findById( id);
      const code=nanoid(6);
      const hashcode=bcrypt.hashSync(code,10);
      user.confirmEmailotb=hashcode;
      await user.save();
          await  sendEmail({to:email,subject,html:signUp(code,username)});
  });
  ////////////////////////////////////////////////////////////////////////
  eventemitter.on("forgetPassword",async(email,username,id)=>{
    const user=await UserModel.findById( id);
    const code=nanoid(6);
    const hashcode=bcrypt.hashSync(code,10);
    user.forgetEmailotb=hashcode;
    await user.save();
        await  sendEmail({to:email,subject,html:signUp(code,username)});
  });
  ////////////////////////////////////////////////////////////////////////////////
  
  eventemitter.on("updateEmail",async(email,username,id)=>{
    const user=await UserModel.findById( id);
    const code=nanoid(6);
    const hashcode=bcrypt.hashSync(code,10);
    user.updateEmailotb=hashcode;
    await user.save();
    
        
        await  sendEmail({to:email,subject,html:signUp(code,username)});
  });
  