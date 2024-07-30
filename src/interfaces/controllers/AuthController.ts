import { Request, Response } from "express";
import { AdminLogin } from "../../application/usecases/authUsecases/AdminLogin";
import { generateToken } from "../../utils/jwt";

export class AuthController {
  constructor(private adminLogin: AdminLogin) {}

  async adminSignin(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const admin = await this.adminLogin.checkAdmin(email);
      res.cookie("token", generateToken(admin._id), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });
      return res.json(admin)
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "error.message" });
      }
    }
  }
}
