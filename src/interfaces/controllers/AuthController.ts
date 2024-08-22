import { NextFunction, Request, Response } from "express";
import { AdminLogin } from "../../application/usecases/authUsecases/AdminLogin";
import { generateToken } from "../../utils/jwt";
import { ShopLogin } from "../../application/usecases/authUsecases/ShopLogin";
import { ShopSignup } from "../../application/usecases/authUsecases/ShopSignup";
import { CustomError } from "../../utils/error";
import { GetShopData } from "../../application/usecases/authUsecases/GetShopData";
import { ForgotPassword } from "../../application/usecases/authUsecases/ForgotPassword";
import { VerifyOtp } from "../../application/usecases/authUsecases/VerifyOtp";
import { ResetPassword } from "../../application/usecases/authUsecases/ResetPassword";
import { ChangePassword } from "../../application/usecases/authUsecases/ChangePassword";

export class AuthController {
  constructor(
    private adminLogin: AdminLogin,
    private shopLogin: ShopLogin,
    private shopCreate: ShopSignup,
    private getShop: GetShopData,
    private forgotPassword: ForgotPassword,
    private verifyOtp: VerifyOtp,
    private resetPass: ResetPassword,
    private changePass:ChangePassword
  ) {}

  async adminSignin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const admin = await this.adminLogin.checkAdmin(email);
      const token = await generateToken(admin._id);
      return res.json({ ...admin, token });
    } catch (error) {
      next(error);
    }
  }

  async shopSignin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const shop = await this.shopLogin.checkShop(email, password);
      if (shop._id) {
        const token = await generateToken(shop._id);
        return res.json({ ...shop, token });
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
      const data = await this.shopCreate.shopSignup(
        email,
        name,
        latitude,
        longitude,
        phone,
        password,
        confirmPassword
      );
      if (data) {
        res.json({ message: "OTP sent to the Email" });
      }
    } catch (error) {
      next(error);
    }
  }

  async getShopData(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user;
      if (!id) throw new CustomError(401, "ID didnt Provided");
      const shop = await this.getShop.execute(id);
      res.json(shop);
    } catch (error) {
      next(error);
    }
  }

  async forgotPasswords(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await this.forgotPassword.execute(email);
      res.json({ message: "OTP sent to the email" });
    } catch (error) {
      next(error);
    }
  }

  async verifyOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const data = await this.verifyOtp.execute(email, otp, "signup");
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async forgotPasswordVerifyOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, otp } = req.body;
      const data = await this.verifyOtp.execute(email, otp, "forgotPassword");
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email,password, confirmPassword } = req.body;
      const data = await this.resetPass.execute(email,password, confirmPassword);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async changePassword(req:Request,res:Response,next:NextFunction){
    try {
      const {email,existingPassword,newPassword,confirmPassword}=req.body
      const passChange =await this.changePass.execute(email,existingPassword,newPassword,confirmPassword)
      res.json(passChange)
    } catch (error) {
      next(error)
    }
  }
}
