import dotenv from "dotenv"


/*import express from "express";
const app=express();*/
import {app} from "./app.js"

import connectDB from './db/index.js';
import { checkSSLExpiry } from "./services/sslAlert.service.js";
import cron from "node-cron";


dotenv.config({
    path:"./env"
})
connectDB()
.then((resolve)=>{

    app.listen(process.env.PORT || 6869,()=>{
        console.log(`Application is running on PORT ${process.env.PORT}`)

    })
})

.catch((err)=>{
    console.log(`MongoDB connection failed`,err);
})








/* ================= SSL EXPIRY CHECK ================= */

/* Run Daily at 9 AM */

cron.schedule(

  "0 9 * * *",

  async () => {

    console.log(
      "Running SSL Expiry Check..."
    );

    await checkSSLExpiry();

  }

);