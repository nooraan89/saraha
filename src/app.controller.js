import authRouter from "./modules/auth/auth.controller.js"
import userrouter from "./modules/user/user.controller.js"

import  messagerouter from "./modules/messages/message.controller.js"
import connectDb from "./db/connection.js"
import { globalError } from "./utils/error handling/globalErrorHandler.js";
import { notFoundError } from "./utils/error handling/notFoundError.js";
const bootstrap=async(app,express)=>{ 
       app.use(express.json());

    await  connectDb();
    app.use("/auth",authRouter)
    app.use("/user",userrouter)
    app.use("/message",messagerouter)
//app.use("message",messagerouter)


app.all("*",notFoundError)
app.use(globalError)

}
export default  bootstrap;




