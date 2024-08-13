import { Admin, Shops } from "../entities";

export interface IAuthRepository {
  createShop(data: Shops): Promise<string>;
  shopLogin(email: string, password: string): Promise<Shops>;
  adminLogin(email: string): Promise<Admin>;
  getShopData(id: string): Promise<Shops>;
  forgotPassword(email: string, otp: number): Promise<number>;
  verifyOtp(email: string, otp: number): Promise<string>;
  verifyForgotPassOtp(email: string, otp: number): Promise<string>;
  resetPassword(email:string,password: string): Promise<string>;
}