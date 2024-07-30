import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  customer: string;
  table: string;
  date: Date;
  shop: string;
  product: [
    {
      name: string;
      quantity: number;
      price: number;
      total: number;
    }
  ];
  grandTotal: number;
  status: string;
}

const OrderSchema: Schema = new Schema({
  customer: {
    type: String,
    required: true,
  },
  table: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  shop: {
    type: mongoose.Types.ObjectId,
    ref: "Shops",
  },
  product: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  grandTotal: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
  },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
