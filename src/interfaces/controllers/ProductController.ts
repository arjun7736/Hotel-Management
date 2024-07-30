import { Request, Response } from "express";
import { AddProduct } from "../../application/usecases/productUsecases/AddProduct";
import { listProduct } from "../../application/usecases/productUsecases/ListProducts";
import { Products } from "../../domain/entities";

export class ProductController {
  constructor(
    private addProduct: AddProduct,
    private listproduct: listProduct
  ) {}

  async createProduct(req: Request, res: Response) {
    try {
      const { name, image, category, price, quantity, shop } = req.body;
      const newproduct = new Products(
        name,
        image,
        category,
        price,
        quantity,
        shop
      );
      const product = await this.addProduct.execute(newproduct);
      return res.json(product);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }

  async listProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const products = await this.listproduct.exicute(id);
      return res.json(products);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
}
