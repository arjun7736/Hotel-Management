import mongoose from "mongoose";

export class Category {
  constructor(
    public name: string,
    public image: string,
    public shop: string,
    public _id?: mongoose.Types.ObjectId,
  ) {}
}
