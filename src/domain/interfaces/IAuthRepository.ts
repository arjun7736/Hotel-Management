import { Admin, Shops } from "../entities";
import { Otp } from "../entities/Otp";

export interface IAuthRepository {
  createShop(data: Shops): Promise<string>;
  findAdminByEmail(email: string): Promise<Admin | null>;
  findShopByEmail(email: string): Promise<Shops | null>;
  findShopById(id: string): Promise<Shops | null>;
  findOtpDataByEmail(email: string): Promise<Otp | null>;
  forgotPassword(email: string, otp: number): Promise<number>;

  verifyOtp(
    email: string,
    imageLogo: string,
    banner: string,
    name: string,
    location: [
      {
        latitude: number;
        longitude: number;
      }
    ],
    phone: number,
    password: string
  ): Promise<string | null>;

  resetPassword(email: string, password: string): Promise<string | null>;
  changePassword(email: string, newPassword: string): Promise<string | null>;
}
