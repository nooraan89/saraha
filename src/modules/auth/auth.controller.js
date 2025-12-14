import { Router } from "express";
import * as authService from "./auth.service.js"
import { asyncHandler } from "../../utils/error handling/asyncHandler.js";
import {validatonmidelwers} from "../../middelewares/validetion.midelewers.js"
import { confermScheama, forgetpasswordScheama, rejisterscheama, resetPasswordScheama} from "./auth.validation.js";
import {loginScheama} from "./auth.validation.js";
const router = Router();
router.get("/",(req,res)=>{console.log("jo")})
router.post("/rejister",validatonmidelwers(rejisterscheama),asyncHandler(authService.register));
router.post("/login",validatonmidelwers(loginScheama),asyncHandler(authService.login));
router.patch("/confermemail",validatonmidelwers(confermScheama),asyncHandler(authService.confermeEmail));
router.post("/forgetPassword",validatonmidelwers(forgetpasswordScheama),asyncHandler(authService.forget_password))
router.patch("/resetpassword",validatonmidelwers(resetPasswordScheama),asyncHandler(authService.reset_password))


export default router;