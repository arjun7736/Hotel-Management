import { Category } from "../../../domain/entities";
import { ICategoryRepository } from "../../../domain/interfaces/ICategoryRepository";
import { CustomError } from "../../../utils/error";

export class ListCategory{
    constructor(private categoryRepository:ICategoryRepository){}

    async execute(id:string):Promise<Category[]>{
        if(!id) throw new CustomError(400,"ID missing")
        return await this.categoryRepository.listCategory(id)
    }
}