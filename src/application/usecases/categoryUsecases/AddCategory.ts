import { Category } from "../../../domain/entities";
import { ICategoryRepository } from "../../../domain/interfaces/ICategoryRepository";
import { CustomError } from "../../../utils/error";

export class AddCategory{
    constructor(private categoryRepository:ICategoryRepository){}

    async execute(category:Category):Promise<Category>{
        if(!category.name || !category.image || !category.shop){
            throw new CustomError(400,"Please Fill all the fields")
        }
        return await this.categoryRepository.createCategory(category)
    }
}