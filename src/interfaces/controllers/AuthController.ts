import { NextFunction, Request, Response } from "express";
import { AdminLogin } from "../../application/usecases/authUsecases/AdminLogin";
import { generateToken } from "../../utils/jwt";
import { ShopLogin } from "../../application/usecases/authUsecases/ShopLogin";
import { ShopSignup } from "../../application/usecases/authUsecases/ShopSignup";
import { CustomError } from "../../utils/error";

export class AuthController {
  constructor(
    private adminLogin: AdminLogin,
    private shopLogin: ShopLogin,
    private shopCreate: ShopSignup
  ) {}

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
async getShopData(req:Request,res:Response,next:NextFunction){
  try {
   const token =req.cookies["token"] 
   console.log(token)
  } catch (error) {
    next(error)
  }
}

}
