import MessageModel from "../../db/modeles/message.model.js";
import UserModel from "../../db/modeles/user.model.js";

export const flags={inbox:"inbox",outbox:"outbox"};

export const  createMessage=async(req,res,next)=>{
    const {content,reciver}=req.body;
const user =await UserModel.findById(reciver);
if(!user)return next(new Error("reciver not found",{cause:404}))
    const sender=req.user._id;
const message = MessageModel.create({content,reciver,sender});

return res.status(200).json({saccess:true,message:"message sent successfully",results:message});
};

export const getMessage=async(req,res,next)=>{
    console.log("yes")
const {messageId}=req.params;
const message=await MessageModel.findById(messageId);

if(!message)
    return next(new Error("message not found",{cause:404}));
if(message.reciver.toString()==req.user._id.toString()||message.sender.toString()==req.user._id.toString())
return res.status(200).json({saccess:true,results:message})
return next(new Error("unauthorized"))

};
 

export const getAllMessage=async(req,res,next)=>{
const {flag}=req.query;
return res.status(200).json({success:true,
    results:flag==flags.inbox?await MessageModel.find({reciver:req.user._id})
    :await MessageModel.find({sender:req.user._id})

})};
 export const updateMessage =async(req,res,next)=>{
const {messageId}=req.params;
const {content}=req.body;
console.log("ok")
const message =await MessageModel.findByIdAndUpdate(messageId,{content:content},{new:true})
;
if(!message)return next(new Error("message not found!",{cause:404}))
if(message.sender.toString()!=req.user._id.toString())
    return next(new Error("no authorized",{cause:400}));
    message.content=content;
    message.save();
    return res.status(202).json({stack:true,message:"message updated successfully!"})


 }
 export const deleteMessage=async(req,res,next)=>{
const {messageId}=req.params;
const message=await MessageModel.findById(messageId);
console.log(message)
if(!message)return next(new Error("message not found",{cause:404}))
if(req.user._id.toString()===message.sender.toString()
    ||req.user._id.toString()===message.reciver.toString()
||req.user.role==="admin"){await MessageModel.deleteOne(message)
return res.status(200).json({message:"message deleded successfully!!"})}
return next(new Error("no authrized",{cause:400}))

//return res.status(200).json({Message:"message deleted successfully!"})
 }