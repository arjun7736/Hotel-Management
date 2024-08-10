import mongoose from "mongoose";
import { Products } from "../../../domain/entities";
import { IProductsRepository } from "../../../domain/interfaces/IProductRepository";
import ProductDB from "../models/ProductModel";
import { CustomError } from "../../../utils/error";
import { Data } from "../../../application/usecases/productUsecases/UpdateProduct";

export class ProductsRepository implements IProductsRepository {
  
  async createProduct(product: Products): Promise<Products> {
    const existProduct = await ProductDB.findOne({ name:product.name,shop:product.shop });
    if (existProduct) throw new CustomError(400, "Product Already Exist");
    const newProduct = new ProductDB(product);
    await newProduct.save();

    return new Products(
      newProduct.name,
      newProduct.image,
      newProduct.category,
      newProduct.price,
      newProduct.offerPrice,
      newProduct.quantity,
      newProduct.quantityType,
      newProduct.shop,
      newProduct._id as mongoose.Types.ObjectId
    );
  }

  async listProduct(id: string): Promise<Products[]> {
    const products = await ProductDB.find({ shop: id }).populate('category') ;
    if (!products) throw new CustomError(404, "Products not found");
    return products.map((product) => {
      return new Products(
        product.name,
        product.image,
        product.category,
        product.price,
        product.offerPrice,
        product.quantity,
        product.quantityType,
        product.shop,
        product._id as mongoose.Types.ObjectId
      );
    });
  }

  async findByNameProduct(name: string): Promise<Products[]> {
    const products = await ProductDB.find({ name });
    if (!products) throw new CustomError(404, "Products not found");
    return products.map((product) => {
      return new Products(
        product.name,
        product.image,
        product.category,
        product.price,
        product.offerPrice,
        product.quantity,
        product.quantityType,
        product.shop,
        product._id as mongoose.Types.ObjectId
      );
    });
  }

  async findByIdProduct(id: string): Promise<Products> {
    const product = await ProductDB.findById(id);
    if (!product) throw new CustomError(404, "Product not found");
    return new Products(
      product.name,
      product.image,
      product.category,
      product.price,
      product.offerPrice,
      product.quantity,
      product.quantityType,
      product.shop,
      product._id as mongoose.Types.ObjectId
    );
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await ProductDB.findByIdAndDelete(id);
    if (!product) throw new CustomError(404, "Product not found");
  }
  
  async updateProduct(product: Data): Promise<Products> {
    const updatedProduct = await ProductDB.findByIdAndUpdate(
      product._id,
      {$set:product},
      { new: true }
    );
    if (!updatedProduct) throw new CustomError(500, "Error While update");
    return new Products(
      updatedProduct.name,
      updatedProduct.image,
      updatedProduct.category,
      updatedProduct.price,
      updatedProduct.offerPrice,
      updatedProduct.quantity,
      updatedProduct.quantityType,
      updatedProduct.shop,
      updatedProduct._id as mongoose.Types.ObjectId
    );
  }
}
