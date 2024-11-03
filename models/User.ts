import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type: String,
        required:true,
        enum : ['user','admin'],
    }
})


export default mongoose.model("User",UserSchema)