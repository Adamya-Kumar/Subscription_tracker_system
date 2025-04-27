import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:"String",
        required:[true,"User Name is required"],
        trim:true,
        minLenght:2,
        maxLenght:50,
    },
    email:{
        type:"String",
        required:[true,"User Email is required"],
        unique:true,
        trim:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Please fill a valid email address"]
    },
    password:{
        type:"String",
        required:[true,"User Password is required"],
        minLenght:6,
        maxLenght:100,
    }
}, {timestamps:true} );


const User = mongoose.model("User",userSchema);

export default User;