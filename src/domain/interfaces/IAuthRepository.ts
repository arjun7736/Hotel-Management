import { Admin, Shops } from "../entities";

export interface IAuthRepository {
  createShop(data: Shops): Promise<Shops>;
  shopLogin(email: string, password: string): Promise<Shops>;
  adminLogin(email: string): Promise<Admin>;
  getShopData(id: string): Promise<Shops>;
}