import mongoose from "mongoose";
import { Category } from "../../../domain/entities";
import { ICategoryRepository } from "../../../domain/interfaces/ICategoryRepository";
import { CustomError } from "../../../utils/error";
import CategoryDB from "../models/CategoryModel";

export class CategoryRepository implements ICategoryRepository {

  async createCategory(category: Category): Promise<Category> {
    const isExistingCategory = await CategoryDB.findOne({
      name: category.name,shop:category.shop
    });
    if (isExistingCategory)
      throw new CustomError(400, "Category Already Exists");
    const newCat = new CategoryDB(category);
    await newCat.save();

    return new Category(newCat.name, newCat.image, newCat.shop, newCat._id as mongoose.Types.ObjectId);
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
  ): Promise<Category> {
    const updateFields: { name?: string; image?: string } = {};
    if (name) updateFields.name = name;
    if (image) updateFields.image = image;
    await CategoryDB.updateOne({ _id: id }, { $set: updateFields });
    const updatedCategory = await CategoryDB.findById(id);
    if (!updatedCategory) {
      throw new CustomError(404, "Category not found");
    }
    return new Category(
      updatedCategory.name,
      updatedCategory.image,
      updatedCategory.shop,
      updatedCategory._id as mongoose.Types.ObjectId
    );
  }

  async findByNameCategory(name: string): Promise<Category> {
    const category = await CategoryDB.findOne({ name: name });
    if (!category) throw new CustomError(404, "Category not Found");
    return new Category(
      category.name,
      category.image,
      category.shop,
      category._id as mongoose.Types.ObjectId
    );
  }
}
