import mongoose,{Schema,Document} from "mongoose";

export interface IAdmin extends Document {
  email: string;
}

const AdminSchema:Schema = new Schema<IAdmin>({
  email: {
    type: String,
    required: true,
  }
})

export default mongoose.model<IAdmin>("Admin", AdminSchema);