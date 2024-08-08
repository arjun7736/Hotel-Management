import mongoose from "mongoose";
import { Category } from "../../../domain/entities";
import { ICategoryRepository } from "../../../domain/interfaces/ICategoryRepository";
import { CustomError } from "../../../utils/error";
import CategoryDB from "../models/CategoryModel";

export class CategoryRepository implements ICategoryRepository {
  async createCategory(category: Category): Promise<Category> {
    const isExistingCategory = await CategoryDB.findOne({
      name: category.name,
    });
    if (isExistingCategory)
      throw new CustomError(400, "Category Already Exists");
    const newCat = new CategoryDB(category);
    await newCat.save();

    if (!(newCat._id instanceof mongoose.Types.ObjectId)) {
      throw new CustomError(500, "Invalid ID type");
    }

    return new Category(newCat.name, newCat.image, newCat.shop, newCat._id);
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
    if (!(updatedCategory._id instanceof mongoose.Types.ObjectId)) {
      throw new CustomError(500, "Invalid ID type");
    }
    return new Category(
      updatedCategory.name,
      updatedCategory.image,
      updatedCategory.shop,
      updatedCategory._id
    );
  }

  async findByNameCategory(name: string): Promise<Category> {
    const category = await CategoryDB.findOne({ name: name });
    if (!category) throw new CustomError(404, "Category not Found");
    if (!(category._id instanceof mongoose.Types.ObjectId)) {
      throw new CustomError(500, "Invalid ID type");
    }
    return new Category(
      category.name,
      category.image,
      category.shop,
      category._id
    );
  }
}
