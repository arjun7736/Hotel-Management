import mongoose,{Schema,Document} from "mongoose";

export interface ICategory extends Document{
   name:string;
   image:string;
   shop:string;
}
const CategorySchema:Schema = new Schema({
   name: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
   shop:{
      type:mongoose.Types.ObjectId,
      ref:"Shops",
   }
})

export default mongoose.model<ICategory>("Category", CategorySchema);