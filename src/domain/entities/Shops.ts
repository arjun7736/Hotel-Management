import mongoose from "mongoose";

export class Shops{
    constructor(
        public email:string,
        public imageLogo:string,
        public banner: string,
        public name:string,
        public location:[{
            latitude:number,
            longitude:number
        }],
        public phone:number, 
        public _id?:mongoose.Types.ObjectId,
    ){}
}