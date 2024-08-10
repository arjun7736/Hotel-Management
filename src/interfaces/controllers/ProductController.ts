import { NextFunction, Request, Response } from "express";
import { AddProduct } from "../../application/usecases/productUsecases/AddProduct";
import { listProduct } from "../../application/usecases/productUsecases/ListProducts";
import { DeleteProduct } from "../../application/usecases/productUsecases/DeleteProduct";
import { Products } from "../../domain/entities";

export class ProductController {
  constructor(
    private addProduct: AddProduct,
    private listproduct: listProduct,
    private deleteProduct: DeleteProduct
  ) {}

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, image, category, price, quantity,quantityType,offerPrice, shop } = req.body;
      const newproduct = new Products(
        name,
        image,
        category,
        price,
        offerPrice,
        quantity,
        quantityType,
        shop
      );
      const product = await this.addProduct.execute(newproduct);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async listProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const products = await this.listproduct.exicute(id);
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async deleteExistingProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.deleteProduct.execute(id);
      return res.json("product deleted");
    } catch (error) {
      next(error);
    }
  }
}
