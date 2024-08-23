export class Otp {
  constructor(
    public _id?: string,
    public email?: string,
    public imageLogo?: string,
    public banner?: string,
    public name?: string,
    public location?: [{
        latitude: number,
        longitude: number
      }],
    public phone?: number,
    public password?: string,    
    public otp?: number,
    public createdAt?: Date
  ) {}
}
