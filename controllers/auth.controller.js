import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const signUp = async(req,res,next) => {
    const session =  await mongoose.startSession();
        session.startTransaction();

        try {
            const {name,email,password} = req.body;
        // check if user already exists
            const isExistingUser = await User.findOne({email})
            if(isExistingUser){
                const error =  new Error("User already exists");
                error.statusCode = 409;
                throw error;
            }
        //Hash password
         const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUsers = await User.create([{name,email,password:hashedPassword}],{session});

        //genrate JWT token
            const token = jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
            //commit transaction
            await session.commitTransaction();
            session.endSession();
            //send response
            res.status(201).json({
                success:true,
                message:"User created successfully",
                data:{
                    token,
                    user:newUsers[0],
                }
            });
            next();
        }catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
}
export const signIn = async(req,res,next) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            const error =  new Error("User not exists");
            error.statusCode = 404;
            throw error;
        }
        const isPasswordVaild =await bcrypt.compare(password,user.password);
            if(!isPasswordVaild){
                const error =  new Error("passwords do not match");
                error.statusCode = 401;
                throw error;
            }
        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})

            res.status(200).json({
                success:true,
                message:"User signin successfully",
                data:{
                    token:token,
                    user:user,
                }
            })

    }catch (error) {
        next(error)
    }

}
