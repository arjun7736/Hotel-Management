import { Shops } from "../../../domain/entities";
import { IAuthRepository } from "../../../domain/interfaces/IAuthRepository";
import { CustomError } from "../../../utils/error";

export class ShopLogin{
    constructor(private shopRepository:IAuthRepository){}

    async checkShop(email:string,password:string):Promise<Shops>{
        if(!email || !password) throw new CustomError(400,"Email and Password is Required")
        const shop = await this.shopRepository.shopLogin(email,password)
        if(!shop) throw new CustomError(404,"Username or Password is Wrong")
        return shop;
    }
}