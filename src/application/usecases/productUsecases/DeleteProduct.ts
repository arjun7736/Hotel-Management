import { IProductsRepository } from "../../../domain/interfaces/IProductRepository";
import { CustomError } from "../../../utils/error";

export class DeleteProduct{
    constructor(private productsRepository: IProductsRepository) {}

    async execute(id: string): Promise<void>{
        if(!id) throw new CustomError(400,"Id is required")
       return await this.productsRepository.deleteProduct(id);
    }
}