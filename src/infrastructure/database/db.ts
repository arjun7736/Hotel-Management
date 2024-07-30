import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI:string |undefined =process.env.MONGO_URI
const ConnectDB =async()=>{
    try {
        if(URI){
            await mongoose.connect(URI);
            console.log("Connected to DB")
        }
    } catch (error) {
        console.log(error);
    }
}

export default ConnectDB;