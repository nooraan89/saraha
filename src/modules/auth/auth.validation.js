import joi from "joi";
import {rolestypes}  from "../../middelewares/auth.middeleware.js";
export const rejisterscheama=joi.object({
    username :joi.string().min(3).max(20).required(),
     email:joi.string().required(),
password:joi.string().required(),
confirmpassword:joi.string().valid(joi.ref("password")).required(),
phone:joi.number(),
role:joi.string().valid(...Object.values(rolestypes))
}).required();


export const  loginScheama=joi.object({
    password: joi.string().required(),
    email: joi.string().required(),
}).required();



export const confermScheama=joi.object({
email:joi.string().required(),
code:joi.string().required()
}).required();
export const forgetpasswordScheama=joi.object({
    email:joi.string().required(),

    }).required();
    export const resetPasswordScheama=joi.object({
        email:joi.string().required(),
        code:joi.string().required(),
       password:joi.string().required()
        }).required(); 