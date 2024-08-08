import { Shops } from "../../../domain/entities";
import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";

export class GetShopData{
    constructor(private shopRepo:IAuthRepository){}
    async execute(id:string):Promise<Shops>{
        return await this.shopRepo.getShopData(id)
    }
}