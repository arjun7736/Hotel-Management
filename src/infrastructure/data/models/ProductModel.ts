import mongoose,{Schema,Document} from "mongoose";

export interface IProduct extends Document{
    name:string;
    image:string;
    category:string;
    price:number;
    offerPrice:number;
    quantity:number;
    quantityType:Array<string>;
    shop:string;
}

const ProductSchema:Schema=new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    offerPrice:{
        type:Number,
        default:0
    },
    quantity: {
        type: Number,
        required: true,
    },
    quantityType:{
        type:Array
    },
    shop: {
        type: mongoose.Types.ObjectId,
        ref: "Shops",
    }
})
export default mongoose.model<IProduct>("Product", ProductSchema);