import { Products } from "../../../domain/entities";
import { IProductsRepository } from "../../../domain/interfaces/IProductRepository";
import { CustomError } from "../../../utils/error";

export class listProduct{
    constructor(private productsRepository: IProductsRepository) {}

    async exicute(id: string): Promise<Products[]>{
        const product = await this.productsRepository.listProduct(id);
        if (!product) throw new CustomError(404, "Products not found");
        return product;
    }
}