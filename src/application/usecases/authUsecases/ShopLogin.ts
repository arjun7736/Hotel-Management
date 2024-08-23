import { Shops } from "../../../domain/entities";
import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { CustomError } from "../../../utils/error";
import bcrypt from "bcrypt";

export class ShopLogin {
  constructor(private shopRepository: IAuthRepository) {}

  async checkShop(email: string, password: string): Promise<Shops> {

    if (!email || !password)
      throw new CustomError(400, "Email and Password is Required");
    const shop = await this.shopRepository.findShopByEmail(email);

    if (!shop) throw new CustomError(404, "Shop not found");
    
    if (!shop.password) throw new CustomError(500, "Password is not exist");

    const passCheck = await bcrypt.compare(password, shop.password);

    if (!passCheck) throw new CustomError(400, "Invalid Credentials");

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
}
