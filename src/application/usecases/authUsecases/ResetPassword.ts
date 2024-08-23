import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { CustomError } from "../../../utils/error";
import bcrypt from "bcrypt";

export class ResetPassword {
  constructor(private authRepository: IAuthRepository) {}

  async execute(email:string,password: string, confirmPassword: string) {
    if (password !== confirmPassword)
      throw new CustomError(
        400,
        "Password and Confirm Password is Not Matching"
      );
    const hashedPass = await bcrypt.hash(password, 10);
    const data = await this.authRepository.resetPassword(email,hashedPass);
    if (!data) {
      throw new CustomError(500, "Error While Updating");
    }
    return "Password Reset";
  }
}
