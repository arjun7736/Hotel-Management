import { Category } from "../entities";

export interface ICategoryRepository{
    createCategory(category: Category): Promise<Category>;
    listCategory(id:string): Promise<Category[]>;
    deleteCategory(id: string): Promise<void>;
    updateCategory(id:string,name?:string,image?:string,): Promise<Category>;
    findByNameCategory(name: string): Promise<Category>;    
}