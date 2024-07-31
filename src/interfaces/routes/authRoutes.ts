import { Router } from "express";
import { AuthRepository } from "../../infrastructure/data/repositories/AuthRepository";
import { AdminLogin } from "../../application/usecases/authUsecases/AdminLogin";
import { AuthController } from "../controllers/AuthController";
import { ShopLogin } from "../../application/usecases/authUsecases/ShopLogin";

const router = Router();
const authRepository = new AuthRepository()
const adminLogin = new  AdminLogin(authRepository)
const shopLogin = new ShopLogin(authRepository)
const authController = new AuthController(adminLogin,shopLogin)

router.post("/admin-login",(req,res,next)=>authController.adminSignin(req,res,next))
router.post("/shop-login",(req,res,next)=>authController.shopSignin(req,res,next))
export default router