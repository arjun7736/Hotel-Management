import { NextFunction, Request, Response } from "express";
import { AdminLogin } from "../../application/usecases/authUsecases/AdminLogin";
import { generateToken } from "../../utils/jwt";
import { ShopLogin } from "../../application/usecases/authUsecases/ShopLogin";
import { ShopSignup } from "../../application/usecases/authUsecases/ShopSignup";
import { CustomError } from "../../utils/error";
import { GetShopData } from "../../application/usecases/authUsecases/GetShopData";

export class AuthController {
  constructor(
    private adminLogin: AdminLogin,
    private shopLogin: ShopLogin,
    private shopCreate: ShopSignup,
    private getShop:GetShopData
  ) {}

  async adminSignin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const admin = await this.adminLogin.checkAdmin(email);
      const token = await generateToken(admin._id)
      return res.json({...admin,token});
    } catch (error) {
      next(error);
    }
  }

  async shopSignin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const shop = await this.shopLogin.checkShop(email, password);
      if (shop._id) {
      const token =await generateToken(shop._id)
        return res.json({...shop,token});
      }
    } catch (error) {
      next(error);
    }
  }

  async shopSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        email,
        name,
        location: { latitude, longitude },
        phone,
        password,
        confirmPassword,
      } = req.body;
      if (!latitude || !longitude)
        throw new CustomError(400, "Location is missing");
      await this.shopCreate.shopSignup(
        email,
        name,
        latitude,
        longitude,
        phone,
        password,
        confirmPassword
      );
      res.json({ message: "SignUp SuccessFull" });
    } catch (error) {
      next(error);
    }
  }

  async logOut(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logout Successfully" });
    } catch (error) {
      next(error);
    }
  }
  async getShopData(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user;
      if (!id) throw new CustomError(401, "ID didnt Provided");
      const shop = await this.getShop.execute(id)
      res.json(shop);
    } catch (error) {
      next(error);
    }
  }
}
