import {Router} from "express"
import { ProductController } from "../controllers/ProductController"
import { ProductsRepository } from "../../infrastructure/data/repositories/ProductRepositiry"
import { AddProduct } from "../../application/usecases/AddProduct"
import { listProduct } from "../../application/usecases/ListProducts"

const productsRepository = new ProductsRepository()
const addProduct = new AddProduct(productsRepository)
const listproduct = new listProduct(productsRepository)


const router = Router()
const productController = new ProductController(addProduct,listproduct)

router.post("/create-product",(req,res)=>productController.createProduct(req,res))
router.get("/list-product/:id",(req,res)=>productController.listProduct(req,res))   


export default router