import { Admin } from "../../../domain/entities/index";
import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { CustomError } from "../../../utils/error";

export class AdminLogin {
  constructor(private adminRepository: IAuthRepository) {}

  async checkAdmin(email: string): Promise<Admin> {
      if (!email) throw new CustomError(400,"Email Required");
      const admin = await this.adminRepository.adminLogin(email);
      return admin;
  }
}
