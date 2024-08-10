import { Products } from "../../../domain/entities";
import { IProductsRepository } from "../../../domain/interfaces/IProductRepository";

export interface Data {
  _id: string;
  name?: string;
  image?: string;
  category?: string;
  price?: number;
  offerPrice?: number;
  quantity?: number;
  quantityType?: Array<string>;
  shop?: string;
}
export class UpdateProduct {
  constructor(private ProductRepo: IProductsRepository) {}

  async execute(data:Data):Promise<Products>{
    return await this.ProductRepo.updateProduct(data)
  };
}
