import mongoose from "mongoose";
import { Shops } from "../../../domain/entities";
import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { CustomError } from "../../../utils/error";

export class GetShopData{
    constructor(private shopRepo:IAuthRepository){}
    
    async execute(id:string):Promise<Shops>{
        const shop =await this.shopRepo.findShopById(id)
        if(!shop) throw new CustomError(404,"Shop Not Found")
        return new Shops(
            shop.email,
            shop.imageLogo,
            shop.banner,
            shop.name,
            shop.location,
            shop.phone,
            shop._id as mongoose.Types.ObjectId
          );
    }
}