import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { CustomError } from "../../../utils/error";
import bcrypt from "bcrypt";
import validator from "validator";

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

    await this.shopRepository.createShop({
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
    return "Shop Created Successfully";
  }
}
