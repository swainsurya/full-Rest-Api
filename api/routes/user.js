import { Router } from "express";
import userModel from "../models/userModel.js" ;
import jwt from "jsonwebtoken" ;
import checking from "../middlewares/userAuth.js";
import {v2 as cloudinary} from "cloudinary" ;

cloudinary.config({ 
    cloud_name: 'di53fuwst', 
    api_key: '564718861163758', 
    api_secret: 'uZJwRi7YzT8HwnW9spOVF-UG-mI' 
  });
let router = Router() ;

router.get("/",checking,(req,res,next) => {
    userModel.find()
    .exec()
    .then(result => {
        res.status(200).json({
            result : result
        })
    })
}) ;

router.post("/register",(req,res,next) => {
    // Register code here
    let file = req.files.photo ;
    cloudinary.uploader.upload(file.tempFilePath,(error,result) => {
        console.log(result);
        let userDB = new userModel({
            fullname : req.body.fullname,
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
            phone : req.body.phone,
            photo : result.url
        })
        userDB.save()
        .then(result => {
            console.log("Register Succeed");
            res.status(200).json({
                result : result
            })
        })
        .catch(error => {
            console.log("Registration Failed");
            res.status(401).json({
                error : error
            })
        })
    })
}) ;

router.post("/login",(req,res,next) => {
    // Login code here
    userModel.find({
        username : req.body.username,
        password : req.body.password
    })
    .then(result => {
        if(result.length < 1) {
            return res.status(401).json({
                msg : "invalid attempt"
            })
        }
        else {
            let token = jwt.sign({
                fullname : result[0].fullname,
                phone : result[0].phone,
                username : result[0].username,
                email : result[0].email
            },"My Jwt token",{expiresIn: "2hr"}) ;
            res.status(200).json({
                // login success
                fullname : result[0].fullname,
                username : result[0].username,
                phone : result[0].phone,
                email : result[0].email,
                token : token
            })
        }
    })
}) ;

export default router ;