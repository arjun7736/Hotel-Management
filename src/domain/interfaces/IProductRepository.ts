import { Data } from "../../application/usecases/productUsecases/UpdateProduct";
import { Products } from "../entities";

export interface IProductsRepository {
  findProductByNameAndShop(name:string,shop:string):Promise<Products|null>
  createProduct(product: Products): Promise<Products>;
  listProduct(id:string): Promise<Products[]|null>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(product: Data): Promise<Products>;
}