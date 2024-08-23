import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { Admin, Shops } from "../../../domain/entities";
import ShopDB from "../models/ShopModel";
import AdminDB from "./../models/AdminModel";
import OTPDB from "../models/OtpModel";
import { Otp } from "../../../domain/entities/Otp";

export class AuthRepository implements IAuthRepository {
  async findAdminByEmail(email: string): Promise<Admin | null> {
    return await AdminDB.findOne({ email });
  }

  async findShopByEmail(email: string): Promise<Shops | null> {
    return await ShopDB.findOne({ email: email });
  }

  async changePassword(
    email: string,
    newPassword: string
  ): Promise<string | null> {
    return await ShopDB.findOneAndUpdate(
      { email: email },
      { password: newPassword }
    );
  }

  async forgotPassword(email: string, otp: number): Promise<number> {
    await OTPDB.create({ email, otp });
    return otp;
  }
  async findShopById(id: string): Promise<Shops | null> {
    return await ShopDB.findById(id);
  }

  async resetPassword(email: string, password: string): Promise<string | null> {
    return await ShopDB.findOneAndUpdate(
      { email },
      { $set: { password } },
      { new: true }
    );
  }

  async createShop(shop: Shops): Promise<string> {
    const newShop = new OTPDB(shop);
    await newShop.save();
    return "OTP sent successfully";
  }

  async findOtpDataByEmail(email: string): Promise<Otp | null> {
    return await OTPDB.findOne({ email });
  }

  async verifyOtp(
    email: string,
    imageLogo: string,
    banner: string,
    name: string,
    location: [{ latitude: number; longitude: number }],
    phone: number,
    password: string
  ): Promise<string | null> {
    await ShopDB.create({
      email: email,
      imageLogo: imageLogo,
      banner: banner,
      name: name,
      location: location,
      phone: phone,
      password: password,
    });
    await OTPDB.deleteOne({ email });
    return "OTP verified";
  }
}
