import mongoose from "mongoose";
import { Products } from "../../../domain/entities";
import { IProductsRepository } from "../../../domain/interfaces/IProductRepository";
import ProductDB from "../models/ProductModel";

export class ProductsRepository implements IProductsRepository {
  async createProduct(product: Products): Promise<Products> {
    const newProduct = new ProductDB(product);
    await newProduct.save();

    if (!(newProduct._id instanceof mongoose.Types.ObjectId)) {
      throw new Error("Invalid ID type");
    }

    return new Products(
      newProduct.name,
      newProduct.image,
      newProduct.category,
      newProduct.price,
      newProduct.quantity,
      newProduct.shop,
      newProduct._id
    );
  }

  async listProduct(id: string): Promise<Products[]> {
    const products = await ProductDB.find({ shop: id });
    if (!products) throw new Error("Products not found");
    return products.map((product) => {
      return new Products(
        product.name,
        product.image,
        product.category,
        product.price,
        product.quantity,
        product.shop
      );
    });
  }

  async findByNameProduct(name: string): Promise<Products[]> {
    const products = await ProductDB.find({ name });
    if (!products) throw new Error("Products not found");
    return products.map((product) => {
      return new Products(
        product.name,
        product.image,
        product.category,
        product.price,
        product.quantity,
        product.shop
      );
    });
  }
  async findByIdProduct(id: string): Promise<Products> {
    const product = await ProductDB.findById(id);
    if (!product) throw new Error("Product not found");
    return new Products(
      product.name,
      product.image,
      product.category,
      product.price,
      product.quantity,
      product.shop
    );
  }
  async deleteProduct(id: string): Promise<void> {
    const product = await ProductDB.findByIdAndDelete(id);
    if (!product) throw new Error("Product not found");
  }
  async updateProduct(product: Products): Promise<Products> {
    const updatedProduct = await ProductDB.findByIdAndUpdate(
      product._id,
      {
        name: product.name,
        image: product.image,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        shop: product.shop,
      },
      { new: true }
    );
    if (!updatedProduct) throw new Error("Error While update");
    return new Products(
      updatedProduct.name,
      updatedProduct.image,
      updatedProduct.category,
      updatedProduct.price,
      updatedProduct.quantity,
      updatedProduct.shop
    );
  }
}
