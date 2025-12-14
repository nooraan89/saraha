import joi from "joi";
import { Schema } from "mongoose";
import { rolestypes } from "../../middelewares/auth.middeleware.js";
export const updateProfileScheama =joi.object({
  username:joi.string().min(3).max(20),
     email:joi.string(),
phone:joi.number(),
role:joi.string().valid(...Object.values(rolestypes))

}).required();
export const  chandgePassword=joi.object({
oldpassword:joi.string().required(),
psassword:joi.string().required(),
confirmpassword:joi.string().valid(joi.ref("passaword")),

}).required()