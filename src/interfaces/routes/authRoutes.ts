import { Router } from "express";
import { AuthRepository } from "../../infrastructure/data/repositories/AuthRepository";
import { AdminLogin } from "../../application/usecases/authUsecases/AdminLogin";
import { AuthController } from "../controllers/AuthController";
import { ShopLogin } from "../../application/usecases/authUsecases/ShopLogin";
import { ShopSignup } from "../../application/usecases/authUsecases/ShopSignup";
import verifyToken from  "../../middleware/jwtVerification"
import { GetShopData } from "../../application/usecases/authUsecases/GetShopData";
import { ForgotPassword } from "../../application/usecases/authUsecases/ForgotPassword";
import { VerifyOtp } from "../../application/usecases/authUsecases/VerifyOtp";
import { ResetPassword } from "../../application/usecases/authUsecases/ResetPassword";
import { ChangePassword } from "../../application/usecases/authUsecases/ChangePassword";

const router = Router();
const authRepository = new AuthRepository()
const adminLogin = new  AdminLogin(authRepository)
const shopLogin = new ShopLogin(authRepository)
const shopSignup = new ShopSignup(authRepository)
const getShopData =new GetShopData(authRepository)
const forgotPassword = new ForgotPassword(authRepository)
const verifyOtp = new VerifyOtp(authRepository)
const resetPassword =new ResetPassword(authRepository)
const changePassword = new ChangePassword(authRepository)
const authController = new AuthController(adminLogin,shopLogin,shopSignup,getShopData,forgotPassword,verifyOtp,resetPassword,changePassword)

router.post("/admin-login",(req,res,next)=>authController.adminSignin(req,res,next))
router.post("/shop-login",(req,res,next)=>authController.shopSignin(req,res,next))
router.post("/shop-signup",(req,res,next)=>authController.shopSignup(req,res,next))
router.get("/get-data",verifyToken,(req,res,next)=>authController.getShopData(req,res,next))
router.post("/verify-otp",(req,res,next)=>authController.verifyOTP(req,res,next))
router.post("/forgot-password",(req,res,next)=>authController.forgotPasswords(req,res,next))
router.post("/forgotpassword-verify-otp",(req,res,next)=>authController.forgotPasswordVerifyOTP(req,res,next))
router.put("/reset-password",(req,res,next)=>authController.resetPassword(req,res,next))
router.put("/change-password",(req,res,next)=>authController.changePassword(req,res,next))
export default router