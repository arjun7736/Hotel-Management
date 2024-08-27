import {IProductsRepository} from "../../../domain/interfaces/IProductRepository";
import {Products} from "../../../domain/entities/index";
import { CustomError } from "../../../utils/error";

export class AddProduct{
    constructor(private productsRepository: IProductsRepository) {}

    async execute(product: Products): Promise<Products>{
        if(!product.name || !product.image || !product.category || !product.price || !product.quantity || !product.shop) {
            throw new CustomError(400,"All fields are required");
        }
        const existProduct = await this.productsRepository.findProductByNameAndShop(product.name,product.shop)
        if (existProduct) throw new CustomError(400, "Product Already Exist");

        const newProduct = await this.productsRepository.createProduct(product);
        return newProduct;
    }
} 