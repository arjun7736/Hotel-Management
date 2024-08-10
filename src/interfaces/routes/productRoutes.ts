import {Router} from "express"
import { ProductController } from "../controllers/ProductController"
import { ProductsRepository } from "../../infrastructure/data/repositories/ProductRepositiry"
import { AddProduct } from "../../application/usecases/productUsecases/AddProduct";
import { listProduct } from "../../application/usecases/productUsecases/ListProducts";
import { DeleteProduct } from "../../application/usecases/productUsecases/DeleteProduct";
import verifyToken from "../../middleware/jwtVerification";
import { UpdateProduct } from "../../application/usecases/productUsecases/UpdateProduct";

const productsRepository = new ProductsRepository()
const addProduct = new AddProduct(productsRepository)
const listproduct = new listProduct(productsRepository)
const deleteProduct = new DeleteProduct(productsRepository)
const updateProduct = new UpdateProduct(productsRepository)
const router = Router()
const productController = new ProductController(addProduct,listproduct,deleteProduct,updateProduct)

router.post("/create-product",verifyToken,(req,res,next)=>productController.createProduct(req,res,next))
router.get("/list-product/:id",verifyToken,(req,res,next)=>productController.listProduct(req,res,next))   
router.delete("/delete-product/:id",verifyToken,(req,res,next)=>productController.deleteExistingProduct(req,res,next))
router.put("/update-product",verifyToken,(req,res,next)=>productController.updateNewProduct(req,res,next))
export default router