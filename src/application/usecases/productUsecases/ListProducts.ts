import { Products } from "../../../domain/entities";
import { IProductsRepository } from "../../../domain/interfaces/IProductRepository";

export class listProduct{
    constructor(private productsRepository: IProductsRepository) {}

    async exicute(id: string): Promise<Products[]>{
        const product = await this.productsRepository.listProduct(id);
        return product;
    }
}