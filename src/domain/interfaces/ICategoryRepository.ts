import { Category } from "../entities";

export interface ICategoryRepository{
    findCategoryBynameAndShop(name:string,shop:string):Promise<Category|null>
    createCategory(category: Category): Promise<Category>;
    listCategory(id:string): Promise<Category[]>;
    deleteCategory(id: string): Promise<void>;
    updateCategory(id:string,name?:string,image?:string,): Promise<Category|null>;
}