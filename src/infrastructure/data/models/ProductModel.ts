import mongoose,{Schema,Document} from "mongoose";

export interface IProduct extends Document{
    name:string;
    image:string;
    category:string;
    price:number;
    quantity:number;
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
    quantity: {
        type: Number,
        required: true,
    },
    shop: {
        type: mongoose.Types.ObjectId,
        ref: "Shops",
    }
})
export default mongoose.model<IProduct>("Product", ProductSchema);