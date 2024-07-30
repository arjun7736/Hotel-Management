import {IProductsRepository} from "../../../domain/interfaces/IProductRepository";
import {Products} from "../../../domain/entities/index";

export class AddProduct{
    constructor(private productsRepository: IProductsRepository) {}

    async execute(product: Products): Promise<Products>{
        const newProduct = await this.productsRepository.createProduct(product);
        return newProduct;
    }
} 