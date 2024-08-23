import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { CustomError } from "../../../utils/error";
import { sendOtp } from "../../../utils/sentOtp";

export class ForgotPassword {
  constructor(private authRepository: IAuthRepository) {}

  async execute(email: string) {
    if (!email) throw new CustomError(400, "Email is Required");

    const otp = Math.floor(100000 + Math.random() * 900000);

    await sendOtp({ to: email, otp: otp });

    const shop = await this.authRepository.findShopByEmail(email);
    
    if (!shop) throw new CustomError(404, "Shop not found");

    const user = await this.authRepository.forgotPassword(email, otp);
    return user;
  }
}
