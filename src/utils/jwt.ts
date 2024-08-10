import jwt from "jsonwebtoken"
import mongoose from "mongoose"

export const generateToken=(id:mongoose.Types.ObjectId):string=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY as string)
}