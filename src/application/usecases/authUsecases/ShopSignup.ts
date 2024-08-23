import { Shops } from "../../../domain/entities";
import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { CustomError } from "../../../utils/error";
import bcrypt from "bcrypt";
import validator from "validator";
import { sendOtp } from "../../../utils/sentOtp";
import mongoose from "mongoose";

export class ShopSignup {
  constructor(private shopRepository: IAuthRepository) {}

  async shopSignup(
    email: string,
    name: string,
    latitude: number,
    longitude: number,
    phone: number,
    password: string,
    confirmPassword: string
  ): Promise<string> {
    if (
      !email ||
      !name ||
      !latitude ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      throw new CustomError(400, "All Fields Must be filled");
    }
    if (password !== confirmPassword) {
      throw new CustomError(
        400,
        "Password and Confirm Password is Not Matching"
      );
    }

    if (!validator.isEmail(email)) throw new CustomError(400, "Invalid Email");
    if (!validator.isMobilePhone(phone.toString(), "en-IN"))
      throw new CustomError(400, "Invalid Phone Number");
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    )
      throw new CustomError(400, "Invalid Password");

    const hashedPass = await bcrypt.hash(password, 10);

    const existShop = await this.shopRepository.findShopByEmail(email);
    if (existShop) throw new CustomError(400, "Email Already Exists");

   const data = await this.shopRepository.createShop({
      email,
      name,
      location: [
        {
          latitude,
          longitude,
        },
      ],
      phone,
      password: hashedPass,
      imageLogo: "",
      banner: "",
    });

    if(data){
      const OTP = Math.floor(100000 + Math.random() * 900000);
      await sendOtp({to:email,otp:OTP})
      return "Shop Created Successfully";
    }
    else {
      throw new CustomError(500,"can't Create Accound")
    }
  }
  
  async getData(id:string):Promise<Shops|null>{
    const data =await this.shopRepository.findShopById(id)
    if(!data) throw new CustomError(404,"Shop Not Found")
    return new Shops(
      data.email,
      data.imageLogo,
      data.banner,
      data.name,
      data.location,
      data.phone,
      data._id as mongoose.Types.ObjectId
    );
  }
}
