import { ICategoryRepository } from "../../../domain/interfaces/ICategoryRepository";
import { CustomError } from "../../../utils/error";

export class DeleteCategory {
  constructor(private categoryRepository: ICategoryRepository) {}
  async execute(id:string):Promise<void>{
    if(!id) throw new CustomError(401,"ID not Found")
    return await this.categoryRepository.deleteCategory(id)
  }
}
