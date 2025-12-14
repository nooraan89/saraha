
import { Router } from "express";
import { allowTo, authentication } from "../../middelewares/auth.middeleware.js";
import { asyncHandler } from "../../utils/error handling/asyncHandler.js";
import * as messageservice from "./message.service.js";
import { validatonmidelwers } from "../../middelewares/validetion.midelewers.js";
import { sendMessageScheama ,getMessageScheama,getAllMessageScheama,updateMessagecheama,deleteMessageScheama} from "./message.validation.js";
const router=Router()

router.post("/createmessage",
    authentication,
    allowTo(["user"]),
    validatonmidelwers(sendMessageScheama),
    asyncHandler(messageservice.createMessage))
router.get("/:messageId",
    authentication,
    allowTo(["user"]),
    validatonmidelwers(getMessageScheama),
    asyncHandler(messageservice.getMessage))
router.get("/",
    authentication,
    allowTo(["user"]),
    validatonmidelwers(getAllMessageScheama),
    asyncHandler(messageservice.getAllMessage))

router.patch("/:messageId",
    authentication,
    allowTo(["user"]),
    validatonmidelwers(updateMessagecheama ),
    asyncHandler(messageservice.updateMessage))

router.delete("/:messageId",
    authentication,
    allowTo(["user","admin"]),
    validatonmidelwers(deleteMessageScheama),
    asyncHandler(messageservice.deleteMessage))



export default router;