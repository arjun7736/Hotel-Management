import { Router } from "express";
import { AuthRepository } from "../../infrastructure/data/repositories/AuthRepository";
import { AdminLogin } from "../../application/usecases/authUsecases/AdminLogin";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authRepository = new AuthRepository()
const adminLogin = new  AdminLogin(authRepository)
const authController = new AuthController(adminLogin)

router.post("/admin-login",(req,res)=>authController.adminSignin(req,res))

export default router