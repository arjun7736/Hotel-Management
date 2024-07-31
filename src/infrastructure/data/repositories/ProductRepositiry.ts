import mongoose from "mongoose";
import { Products } from "../../../domain/entities";
import { IProductsRepository } from "../../../domain/interfaces/IProductRepository";
import ProductDB from "../models/ProductModel";
import { CustomError } from "../../../utils/error";

export class ProductsRepository implements IProductsRepository {
  async createProduct(product: Products): Promise<Products> {
    const newProduct = new ProductDB(product);
    await newProduct.save();

    if (!(newProduct._id instanceof mongoose.Types.ObjectId)) {
      throw new CustomError(500,"Invalid ID type");
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
    if (!products) throw new CustomError(404,"Products not found");
    return products.map((product) => {
      if (!(product._id instanceof mongoose.Types.ObjectId)) {
        throw new CustomError(500,"Invalid ID type");
      }
      return new Products(
        product.name,
        product.image,
        product.category,
        product.price,
        product.quantity,
        product.shop,
        product._id
      );
    });
  }

  async findByNameProduct(name: string): Promise<Products[]> {
    const products = await ProductDB.find({ name });
    if (!products) throw new CustomError(404,"Products not found");
    return products.map((product) => {
      if (!(product._id instanceof mongoose.Types.ObjectId)) {
        throw new CustomError(500,"Invalid ID type");
      }
      return new Products(
        product.name,
        product.image,
        product.category,
        product.price,
        product.quantity,
        product.shop,
        product._id 
      );
    });
  }
  async findByIdProduct(id: string): Promise<Products> {
    const product = await ProductDB.findById(id);
    if (!product) throw new CustomError(404,"Product not found");
    if (!(product._id instanceof mongoose.Types.ObjectId)) {
      throw new CustomError(500,"Invalid ID type");
    }
    return new Products(
      product.name,
      product.image,
      product.category,
      product.price,
      product.quantity,
      product.shop,
      product._id 
    );
  }
  async deleteProduct(id: string): Promise<void> {
    const product = await ProductDB.findByIdAndDelete(id);
    if (!product) throw new CustomError(404,"Product not found");
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
    if (!updatedProduct) throw new CustomError(500,"Error While update");
    if (!(updatedProduct._id instanceof mongoose.Types.ObjectId)) {
      throw new CustomError(500,"Invalid ID type");
    }
    return new Products(
      updatedProduct.name,
      updatedProduct.image,
      updatedProduct.category,
      updatedProduct.price,
      updatedProduct.quantity,
      updatedProduct.shop,
      updatedProduct._id 
    );
  }
}
