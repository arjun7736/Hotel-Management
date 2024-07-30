export class Premium {
  constructor(
    public status: boolean,
    public _id: string,
    public purchasedDate: Date,
    public endDate: Date,
    public shop: string,
    public price : number,
  ) {}
}
