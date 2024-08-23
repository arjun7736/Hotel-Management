import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { CustomError } from "../../../utils/error";

export class VerifyOtp {
  constructor(private authRepository: IAuthRepository) {}

  async execute(email: string, otp: number, type: string) {
    const data = await this.authRepository.findOtpDataByEmail(email);

    if (!data) throw new CustomError(404, "User not found");
    if (data.otp !== otp) throw new CustomError(400, "Invalid OTP");

    if (type === "signup") {
      const {
        email,
        imageLogo,
        banner,
        name,
        location,
        phone,
        password
      } = data;

      if (!email || !imageLogo || !banner || !name || !location || !phone || !password) {
        throw new CustomError(400, "Incomplete data");
      }

      const [{ latitude, longitude }] = location;

      if (latitude === undefined || longitude === undefined) {
        throw new CustomError(400, "Location data is incomplete");
      }

      const verify = await this.authRepository.verifyOtp(
        email,
        imageLogo,
        banner,
        name,
        location,
        phone,
        password
      );

      if (!verify) throw new CustomError(500, "Data not saved");
      return verify;
    } else {
      return "OTP Verified";
    }
  }
}
