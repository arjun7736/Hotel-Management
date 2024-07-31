import { NextFunction, Request, Response } from "express";
import { AdminLogin } from "../../application/usecases/authUsecases/AdminLogin";
import { generateToken } from "../../utils/jwt";
import { ShopLogin } from "../../application/usecases/authUsecases/ShopLogin";

export class AuthController {
  constructor(private adminLogin: AdminLogin, private shopLogin: ShopLogin) {}

  async adminSignin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const admin = await this.adminLogin.checkAdmin(email);
      res.cookie("token", generateToken(admin._id), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });
      return res.json(admin);
    } catch (error) {
      next(error);
    }
  }

  async shopSignin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const shop = await this.shopLogin.checkShop(email, password);
      if (shop._id) {
        res.cookie("token", generateToken(shop._id), {
          httpOnly: true,
          maxAge: 1000 * 60 * 60,
        });
        return res.json(shop);
      }
    } catch (error) {
      next(error);
    }
  }
}
