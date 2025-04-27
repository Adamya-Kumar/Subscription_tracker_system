import mongoose from "mongoose";
import { DB_URI,NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error(`please define the mongodb env variable inside .env.${NODE_ENV}.local`)
}

const connectToDatabase=async()=>{
    try {
       const conn =  await mongoose.connect(DB_URI);
        console.log(`Server connected ${conn.connection.host}`)
        console.log(`connected to database in ${NODE_ENV} mode.`)

    } catch (error) {
        console.log("Error connecting to database",error);
        process.exit(1);   
    }
}

export default connectToDatabase;