import express from "express";
import bootstrap from "./src/app.controller.js"
import dotenv from "dotenv"
dotenv.config({path:"./src/config/.env"})

const app=express();
const port=process.env.PORT;
await bootstrap(app,express);
app.listen(port,()=>console.log(`app running on port ${port}`))