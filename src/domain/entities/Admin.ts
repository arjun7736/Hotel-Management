import mongoose from "mongoose";

export class Admin {
  constructor(public _id: mongoose.Types.ObjectId, public email: string) {}
}
