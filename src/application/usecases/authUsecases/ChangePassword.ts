import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { CustomError } from "../../../utils/error";
import bcrypt from "bcrypt";

export class ChangePassword {
  constructor(private authRepository: IAuthRepository) {}

  async execute(
    email: string,
    existingPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    if (!existingPassword || !newPassword || !confirmPassword) {
      throw new CustomError(400, "All field Must be filled");
    }

    if (newPassword !== confirmPassword)
      throw new CustomError(400, "Passwords are not Matching");

    const shop = await this.authRepository.findShopByEmail(email);
    if (!shop) throw new CustomError(404, "no Shop Found");

    if (!shop.password) throw new CustomError(500, "Shop password is missing");
    const passCheck = await bcrypt.compare(existingPassword, shop.password);

    if (!passCheck)
      throw new CustomError(400, "It is not the Previous Password");

    const hPass = await bcrypt.hash(newPassword, 10);
    const change = await this.authRepository.changePassword(email, hPass);

    if (!change) throw new CustomError(500, "Error Occured While Updating");
    return "Password Changed";
  }}
