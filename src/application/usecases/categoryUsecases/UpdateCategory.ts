import { Category } from "../../../domain/entities";
import { ICategoryRepository } from "../../../domain/interfaces/ICategoryRepository";
import { CustomError } from "../../../utils/error";

export class UpdateCategory{
    constructor(private categoryRepository:ICategoryRepository){}

    async execute(id:string,name:string,image:string):Promise<Category>{
        if(!id) throw new CustomError(400,"id Required")
        return await this.categoryRepository.updateCategory(id,name,image)  
    }
}