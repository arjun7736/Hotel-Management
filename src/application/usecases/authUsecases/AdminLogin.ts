import mongoose from "mongoose";
import { Admin } from "../../../domain/entities/index";
import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { CustomError } from "../../../utils/error";

export class AdminLogin {
  constructor(private adminRepository: IAuthRepository) {}

  async checkAdmin(email: string): Promise<Admin> {
    if (!email) throw new CustomError(400, "Email Required");
    const exists = await this.adminRepository.findAdminByEmail(email);
    if (!exists) throw new CustomError(404, "Admin not found");
    return new Admin(exists._id as mongoose.Types.ObjectId, exists.email);
  }
}
