import { Products } from "../entities";

export interface IProductsRepository {
  createProduct(product: Products): Promise<Products>;
  listProduct(id:string): Promise<Products[]>;
  findByNameProduct(name: string): Promise<Products[]>;
  findByIdProduct(id: string): Promise<Products>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(product: Products): Promise<Products>;
}