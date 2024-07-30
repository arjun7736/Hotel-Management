export class Order {
  constructor(
    public _id: string,
    public customer: string,
    public table: string,
    public date: Date,
    public shop: string,
    public product: [
      {
        name: string;
        quantity: number;
        price: number;
        total: number;
      }
    ],
    public grandTotal: number,
    public status: string
  ) {}
}
