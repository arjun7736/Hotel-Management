import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { CustomError } from "../../../utils/error";

export class ChangePassword{
    constructor(private authRepository:IAuthRepository){}

    async execute(email:string,existingPassword:string,newPassword:string,confirmPassword:string){
        if(!existingPassword || !newPassword || !confirmPassword){
            throw new CustomError(400,"All field Must be filled")
        }
        if(newPassword!==confirmPassword) throw new CustomError(400,"Passwords are not Matching")
        const change =this.authRepository.changePassword(email,existingPassword,newPassword)
        return change
    }
}