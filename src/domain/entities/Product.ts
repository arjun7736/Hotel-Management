import mongoose from "mongoose";

export class Products{
    constructor(
        public name:string,
        public image:string,
        public category:mongoose.Types.ObjectId,
        public price:number,
        public offerPrice:number,
        public quantity:number,
        public quantityType:string[],
        public shop:string,
        public _id?:mongoose.Types.ObjectId,
    ){}
}