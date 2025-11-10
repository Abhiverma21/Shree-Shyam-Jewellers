import { time } from "framer-motion";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
        required:true,
    },
    lastactiveAt:{
        type:Date,
        default:time.now,
    },
   },
    {timestamps:true}
);

export default mongoose.models.User || mongoose.model("User",UserSchema);