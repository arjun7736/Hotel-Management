import {Router} from "express"
import { CategoryRepository } from "../../infrastructure/data/repositories/CategoryRepository"
import { AddCategory } from "../../application/usecases/categoryUsecases/AddCategory"
import { CategoryController } from "../controllers/CategoryController"
import { ListCategory } from "../../application/usecases/categoryUsecases/ListCategory"
import { DeleteCategory } from "../../application/usecases/categoryUsecases/DeleteCategory"
import { UpdateCategory } from "../../application/usecases/categoryUsecases/UpdateCategory"
import verifyToken from "../../middleware/jwtVerification"

const router = Router()

const categoryRepository =new CategoryRepository()
const addCategory = new AddCategory(categoryRepository)
const listCategory =new ListCategory(categoryRepository)
const deleteCategory = new DeleteCategory(categoryRepository)
const updateCategory = new UpdateCategory(categoryRepository)
const categoryController = new CategoryController(addCategory,listCategory,deleteCategory,updateCategory)

router.post("/add-category",verifyToken,(req,res,next)=>categoryController.addNewCategory(req,res,next))
router.get("/list-category/:id",verifyToken,(req,res,next)=>categoryController.categoryList(req,res,next))
router.delete("/delete-category/:id",verifyToken,(req,res,next)=>categoryController.categoryDelete(req,res,next))
router.put("/update-category",verifyToken,(req,res,next)=>categoryController.categoryUpdate(req,res,next))

export default router 