import express from "express" ;
import bodyParser from "body-parser";
import userRoute from "./api/routes/user.js"
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

mongoose.connect("mongodb://localhost:27017/company") ;

// connected success 
mongoose.connection.on("connected",conn => {
    console.log("Connection Succeed");
})

// connected failed 
mongoose.connection.off("error",err => {
    console.log("Connection Failed");
})

let app = express() ;

app.use(bodyParser.urlencoded({extended: false})) ;
app.use(bodyParser.json()) ;

app.use(fileUpload({
    useTempFiles:true
}))

app.use("/user",userRoute) ;

app.get("/",(req,res,next) => {
    res.status(200).json({
        msg : "server is ready"
    })
}) ;

app.listen(4000) ;