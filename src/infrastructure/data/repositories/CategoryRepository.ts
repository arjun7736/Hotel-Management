import mongoose from "mongoose";
import { Category } from "../../../domain/entities";
import { ICategoryRepository } from "../../../domain/interfaces/ICategoryRepository";
import CategoryDB from "../models/CategoryModel";

export class CategoryRepository implements ICategoryRepository {
  
  async findCategoryBynameAndShop(
    name: string,
    shop: string
  ): Promise<Category | null> {
    return await CategoryDB.findOne({ name: name, shop: shop });
  }

  async createCategory(category: Category): Promise<Category> {
    const newCat = new CategoryDB(category);
    await newCat.save();
    return new Category(
      newCat.name,
      newCat.image,
      newCat.shop,
      newCat._id as mongoose.Types.ObjectId
    );
  }

  async listCategory(id: string): Promise<Category[]> {
    return await CategoryDB.find({ shop: id });
  }

  async deleteCategory(id: string): Promise<void> {
    await CategoryDB.findByIdAndDelete(id);
  }

  async updateCategory(
    id: string,
    name: string,
    image: string
  ): Promise<Category |null> {
    const updateFields: { name?: string; image?: string } = {};
    if (name) updateFields.name = name;
    if (image) updateFields.image = image;
    return await CategoryDB.findByIdAndUpdate(
      { _id: id },
      { $set: updateFields }
    );
  }
}
