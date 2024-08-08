import { Router } from "express";
import { AuthRepository } from "../../infrastructure/data/repositories/AuthRepository";
import { AdminLogin } from "../../application/usecases/authUsecases/AdminLogin";
import { AuthController } from "../controllers/AuthController";
import { ShopLogin } from "../../application/usecases/authUsecases/ShopLogin";
import { ShopSignup } from "../../application/usecases/authUsecases/ShopSignup";

const router = Router();
const authRepository = new AuthRepository()
const adminLogin = new  AdminLogin(authRepository)
const shopLogin = new ShopLogin(authRepository)
const shopSignup = new ShopSignup(authRepository)
const authController = new AuthController(adminLogin,shopLogin,shopSignup)

router.post("/admin-login",(req,res,next)=>authController.adminSignin(req,res,next))
router.post("/logout",(req,res,next)=>authController.logOut(req,res,next))
router.post("/shop-login",(req,res,next)=>authController.shopSignin(req,res,next))
router.post("/shop-signup",(req,res,next)=>authController.shopSignup(req,res,next))
router.get("/get-data",(req,res,next)=>authController.getShopData(req,res,next))

export default router