import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";

export class VerifyOtp {
  constructor(private authRepository: IAuthRepository) {}

  async execute(email:string,otp:number,type:string){
    if(type == "signup"){
      const verify =await this.authRepository.verifyOtp(email,otp)
      return verify
    }else{
      const verify =await this.authRepository.verifyForgotPassOtp(email,otp)
      return verify
    }
  }
}