import mongoose,{Schema,Document} from "mongoose";

export interface IShop extends Document{
   email:string;
   imageLogo:string;
   banner: string;
   name:string;
   location:[{
       latitude:number,
       longitude:number
   }],
   phone:number;
   password:string;
}

const ShopSchema:Schema=new Schema({
   email: {
       type: String,
       required: true,
   },
   imageLogo: {
       type: String,
   },
   banner: {
       type: String,
   },
   name: {
       type: String,
       required: true,
   },
   location: {
       type: [{
           latitude: Number,
           longitude: Number,
       }],
       required: true,
   },
   phone: {
       type: Number,
       required: true,
   },
   password:{
    type:String,
    required:true
   }
})

export default mongoose.model<IShop>("Shops", ShopSchema);