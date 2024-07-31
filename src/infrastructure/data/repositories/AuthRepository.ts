import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { Admin, Shops } from "../../../domain/entities";
import ShopDB from "../models/ShopModel";
import mongoose from "mongoose";
import AdminDB from "./../models/AdminModel";
import { CustomError } from "../../../utils/error";

export class AuthRepository implements IAuthRepository {
  async createShop(shop: Shops): Promise<Shops> {
    const newShop = new ShopDB(shop);
    await newShop.save();
    if (!(newShop._id instanceof mongoose.Types.ObjectId)) {
      throw new CustomError(500,"Invalid ID type");
    }

    return new Shops(
      newShop.email,
      newShop.imageLogo,
      newShop.banner,
      newShop.name,
      newShop.location,
      newShop.phone,
      newShop._id
    );
  }

  async shopLogin(email: string, password: string): Promise<Shops> {
    const shop = await ShopDB.findOne({ email, password });
    if (!shop) throw new CustomError(404,"Shop not found");
    if (!(shop._id instanceof mongoose.Types.ObjectId)) {
      throw new CustomError(500,"Invalid ID type");
    }
    return new Shops(
      shop.email,
      shop.imageLogo,
      shop.banner,
      shop.name,
      shop.location,
      shop.phone,
      shop._id
    );
  }
  async adminLogin(email: string): Promise<Admin> {
    const admin = await AdminDB.findOne({ email });
    if (!admin) throw new CustomError(404,"Admin not found");
    if (!(admin._id instanceof mongoose.Types.ObjectId)) {
      throw new CustomError(500,"Invalid ID type");
    }
    return new Admin(admin._id,admin.email);
  }
}
