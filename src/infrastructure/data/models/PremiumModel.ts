import mongoose,{Schema,Document} from "mongoose";

export interface IPremium extends Document{
    status:boolean;
    purchasedDate:Date;
    endDate:Date;
    shop:string;
    price:number;
}



const PremiumSchema:Schema= new Schema({
    status: {
        type: Boolean,
        required: true,
    },
    purchasedDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    shop: {
        type: mongoose.Types.ObjectId,
        ref: "Shops",
    },
    price: {
        type: Number,
        required: true,
    }
})
export default mongoose.model<IPremium>("Premium", PremiumSchema);