import { Schema, Types,model } from "mongoose";
import mongoose from  "mongoose";

 const messageSheama=new mongoose.Schema({
content:{type:String,
    required:true,
},
sender:{type:Types.ObjectId,
    ref:"User",
    required:true,
},
reciver:{
    type:Types.ObjectId,
    ref:"User",
    required:true,

}

},{timestamps:true,}
 );
  const MessageModel=mongoose.models.Message||model("Message",messageSheama);
export default  MessageModel;

 