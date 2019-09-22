class Item {
  id: string;
  name: string;
  isFraction: boolean;
  priceData: PriceData;
  tags: Tag[];

  constructor(
    // id: string,
    // name: string,
    // isFraction: boolean,
    // priceData: PriceData,
    // tags: Tag[]
    response: any
  ) {
    this.id = response._id;
    this.name = response.name;
    this.isFraction = response.isFraction;
    this.priceData = response.priceData;
    this.tags = response.tags;
  }
}

export default Item;
