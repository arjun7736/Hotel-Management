import { Admin } from "../../../domain/entities/index";
import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";

export class AdminLogin{
    constructor(private adminRepository:IAuthRepository){}

    async checkAdmin(email:string):Promise<Admin>{
        const admin = await this.adminRepository.adminLogin(email)
        return admin;
    }
}