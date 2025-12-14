import joi  from "joi";
import {flags} from "./message.service.js"
import { Types } from "mongoose";

export const  sendMessageScheama=joi.object({
content :joi.string().required(),
reciver:joi.custom((value,helper)=>{
    if(Types.ObjectId.isValid(value)){return true}
    else {return helper.message("reciver must be a invalid objectid")}
}).required(),
}).required();

export const getMessageScheama=joi.object({
    messageId:joi.custom((value,helper)=>{
    if(Types.ObjectId.isValid(value))return true
    else{return helper.message("messageid must be a invalid object")}
}).required(),


}).required();


export const getAllMessageScheama =joi.object({
    flag:joi.string().valid(...Object.values(flags)).required()
}).required();

export const  updateMessagecheama =joi.object({
    content:joi.string().required(),

    messageId:joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value))return true
     else {return helper.message("messageId must be a invalis object")};
    }).required(),
    }).required();
    export const deleteMessageScheama =joi.object({
        messageId:joi.custom((value,helper)=>{
            if(Types.ObjectId.isValid(value)){return true}
         else {return helper.message("messageId must be a invalis object")};
    }).required()});