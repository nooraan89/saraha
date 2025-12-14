import {Router} from "express"
import { authentication } from "../../middelewares/auth.middeleware.js";
import { allowTo } from "../../middelewares/auth.middeleware.js";
import { updateProfileScheama } from "./user.validation.js";
import { validatonmidelwers } from "../../middelewares/validetion.midelewers.js";
import * as userService from "./user.service.js";
import { asyncHandler } from "../../utils/error handling/asyncHandler.js";
const router=Router();
router.get("/profile",authentication,allowTo(["user","admin"]),asyncHandler(userService.profile));
router.patch("/update",authentication,allowTo(["user","admin"]),validatonmidelwers(updateProfileScheama),asyncHandler(userService.updateProfile));
router.patch("/deactiveaccount",authentication,allowTo(["user","admin"]),asyncHandler(userService.deactivAteaccount));
router.patch("/changepassword",authentication,allowTo(["user","admin"]),asyncHandler(userService.chandgePassword));

export default router;
