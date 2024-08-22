import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { Admin, Shops } from "../../../domain/entities";
import ShopDB from "../models/ShopModel";
import mongoose from "mongoose";
import AdminDB from "./../models/AdminModel";
import { CustomError } from "../../../utils/error";
import bcrypt from "bcrypt";
import OTPDB from "../models/OtpModel";

export class AuthRepository implements IAuthRepository {
  async createShop(shop: Shops): Promise<string> {
    const existShop = await ShopDB.findOne({ email: shop.email });
    if (existShop) throw new CustomError(400, "Email Already Exists");
    const newShop = new OTPDB(shop);
    await newShop.save();
    return "OTP sent successfully";
  }

  async shopLogin(email: string, password: string) {
    const shop = await ShopDB.findOne({ email });
    if (!shop) throw new CustomError(404, "Shop not found");
    const passCheck = await bcrypt.compare(password, shop.password);
    if (!passCheck) throw new CustomError(400, "Invalied Credentials");

    return new Shops(
      shop.email,
      shop.imageLogo,
      shop.banner,
      shop.name,
      shop.location,
      shop.phone,
      shop._id as mongoose.Types.ObjectId
    );
  }

  async adminLogin(email: string): Promise<Admin> {
    const admin = await AdminDB.findOne({ email });
    if (!admin) throw new CustomError(404, "Admin not found");
    return new Admin(admin._id as mongoose.Types.ObjectId, admin.email);
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
  }
  async verifyOtp(email: string, otp: number): Promise<string> {
    const data = await OTPDB.findOne({ email });
    if (!data) throw new CustomError(404, "User not found");
    if (data.otp !== otp) throw new CustomError(400, "Invalid OTP");
    await ShopDB.create({
      email: data.email,
      imageLogo: data.imageLogo,
      banner: data.banner,
      name: data.name,
      location: data.location,
      phone: data.phone,
      password: data.password,
    });
    await OTPDB.deleteOne({ email });
    return "OTP verified";
  }
  async forgotPassword(email: string, otp: number): Promise<number> {
    const shop = await ShopDB.findOne({ email });
    if (!shop) throw new CustomError(404, "Shop not found");
    await OTPDB.create({ email, otp });
    return otp;
  }

  async verifyForgotPassOtp(email: string, otp: number): Promise<string> {
    const data = await OTPDB.findOne({ email });
    if (!data) throw new CustomError(404, "User not found");
    if (data.otp !== otp) throw new CustomError(400, "Invalid OTP");
    return "OTP Verified";
  }

  async resetPassword(email: string, password: string): Promise<string> {
    const data = await ShopDB.findOneAndUpdate(
      { email },
      { $set: { password } },
      { new: true }
    );
    if (data) {
      return "Password Reset";
    }
    throw new CustomError(500, "Error While Updating");
  }

  async changePassword(
    email: string,
    existingPassword: string,
    newPassword: string
  ): Promise<string> {
    const data = await ShopDB.findOne({ email: email });
    if (!data) throw new CustomError(404, "no data Found");
    const passCheck = await bcrypt.compare(existingPassword, data.password);
    if (!passCheck)
      throw new CustomError(400, "It is not the Previous Password");
    const hPass = await bcrypt.hash(newPassword, 10);
    const chnage = await ShopDB.findOneAndUpdate(
      { email: email },
      { password: hPass }
    );
    if (!chnage) throw new CustomError(500, "Error Occured While Updating");
    return "Password Updated";
  }
}
