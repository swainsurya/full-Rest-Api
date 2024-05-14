import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    fullname : String,
    username : String,
    email : String,
    password : String,
    phone : Number,
    photo : String
}) ;

let userModel = mongoose.model("Users_Practise",userSchema) ;

export default userModel ;