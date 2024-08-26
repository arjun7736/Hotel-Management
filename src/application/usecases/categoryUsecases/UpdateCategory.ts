import mongoose from "mongoose";
import { Category } from "../../../domain/entities";
import { ICategoryRepository } from "../../../domain/interfaces/ICategoryRepository";
import { CustomError } from "../../../utils/error";

export class UpdateCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string, name: string, image: string): Promise<Category> {
    if (!id) throw new CustomError(400, "id Required");
    const updatedCategory = await this.categoryRepository.updateCategory(
      id,
      name,
      image
    );
    if(!updatedCategory) throw new CustomError(500,"Error While Saving data")
    return new Category(
      updatedCategory.name,
      updatedCategory.image,
      updatedCategory.shop,
      updatedCategory._id as mongoose.Types.ObjectId
    );
  }
}
