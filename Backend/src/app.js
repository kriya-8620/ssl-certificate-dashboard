import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express();


app.use(cors({
  
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))
app.use(cookieParser());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));


//SSL
 import sslRoutes from "./routes/ssl.routes.js";
 app.use("/api/v1/ssl",sslRoutes);




app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    data: null
  });
});




export {app};