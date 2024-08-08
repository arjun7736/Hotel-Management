import { NextFunction, Request, Response } from "express";
import { AddCategory } from "../../application/usecases/categoryUsecases/AddCategory";
import { Category } from "../../domain/entities";
import { CustomError } from "../../utils/error";
import { ListCategory } from "../../application/usecases/categoryUsecases/ListCategory";
import { DeleteCategory } from "../../application/usecases/categoryUsecases/DeleteCategory";
import { UpdateCategory } from "../../application/usecases/categoryUsecases/UpdateCategory";

export class CategoryController {
  constructor(
    private addCategory: AddCategory,
    private listCategory: ListCategory,
    private deleteCategory: DeleteCategory,
    private updateCategory:UpdateCategory
  ) {}

  async addNewCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, image, shop } = req.body;
      const newCat = new Category(name, image, shop);
      const category = await this.addCategory.execute(newCat);
      if (!category) throw new CustomError(500, "Category not saved Try again");
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }
  async categoryList(req:Request,res:Response,next:NextFunction){
    try {
        const{id}= req.params
        const list =await this.listCategory.execute(id)
        if(!list) throw new CustomError(404,"Empty Category")
        return res.json(list)
    } catch (error) {
        next(error)
    }
  }
  async categoryDelete(req:Request,res:Response,next:NextFunction){
    try {
        const{id}=req.params
        await this.deleteCategory.execute(id)
        res.json({message:"Successfully Deleted"}) 
       } catch (error) {
        next(error)
    }
  }

  async categoryUpdate(req:Request,res:Response,next:NextFunction){
    try {
        const {id,name,image}=req.body
        const update = await this.updateCategory.execute(id,name,image)
        if(!update) throw new CustomError(500,"Cant Update Try Again")
        res.json(update)
    } catch (error) {
        next(error)
    }
  }
}
