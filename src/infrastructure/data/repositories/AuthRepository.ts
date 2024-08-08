import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { Admin, Shops } from "../../../domain/entities";
import ShopDB from "../models/ShopModel";
import mongoose from "mongoose";
import AdminDB from "./../models/AdminModel";
import { CustomError } from "../../../utils/error";
import bcrypt from "bcrypt";

export class AuthRepository implements IAuthRepository {
  async createShop(shop: Shops): Promise<Shops> {
    const existShop = await ShopDB.findOne({ email: shop.email });
    if (existShop) throw new CustomError(400, "Email Already Exists");
    const newShop = new ShopDB(shop);
    await newShop.save();
    if (!(newShop._id instanceof mongoose.Types.ObjectId)) {
      throw new CustomError(500, "Invalid ID type");
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

  async shopLogin(email: string, password: string) {
    const shop = await ShopDB.findOne({ email });
    if (!shop) throw new CustomError(404, "Shop not found");
    const passCheck = await bcrypt.compare(password, shop.password);
    if (!passCheck) throw new CustomError(400, "Invalied Credentials");

    if (!(shop._id instanceof mongoose.Types.ObjectId)) {
      throw new CustomError(500, "Invalid ID type");
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
    if (!admin) throw new CustomError(404, "Admin not found");
    if (!(admin._id instanceof mongoose.Types.ObjectId)) {
      throw new CustomError(500, "Invalid ID type");
    }
    return new Admin(admin._id, admin.email);
  }

async getShopData(id: string): Promise<Shops> {
  const data = await ShopDB.findById(id);
  if (!data) throw new CustomError(404, "Shop not found");
  return new Shops(
    data.email,
    data.imageLogo,
    data.banner,
    data.name,
    data.location,
    data.phone,
    data._id as mongoose.Types.ObjectId
  );
}}
