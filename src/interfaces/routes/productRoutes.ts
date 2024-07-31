import {Router} from "express"
import { ProductController } from "../controllers/ProductController"
import { ProductsRepository } from "../../infrastructure/data/repositories/ProductRepositiry"
import { AddProduct } from "../../application/usecases/productUsecases/AddProduct";
import { listProduct } from "../../application/usecases/productUsecases/ListProducts";

const productsRepository = new ProductsRepository()
const addProduct = new AddProduct(productsRepository)
const listproduct = new listProduct(productsRepository)


const router = Router()
const productController = new ProductController(addProduct,listproduct)

router.post("/create-product",(req,res,next)=>productController.createProduct(req,res,next))
router.get("/list-product/:id",(req,res,next)=>productController.listProduct(req,res,next))   


export default router