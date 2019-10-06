import PriceData from "./PriceData";

class Nota {
  _id: string;
  title: string;
  items: Object[];
  local: string;
  timestamp: Number;
  tags: string[];

  constructor(response: any) {
    this._id = response._id;
    this.title = response.title;
    this.items = response.items;
    this.local = response.local;
    this.timestamp = response.timestamp;
    this.tags = response.tags;
  }

  setItemsElement(item: String, quantity: Number) {
    this.items.push({ item: item, quantity: quantity });
  }

  setItems(items: Object[]) {
    this.items = items;
  }

  getTotal() {
    let total: any = 0;
    this.items.forEach((priceData: any) => {
      total += Number(priceData.fixedPriceData.price) * priceData.quantity;
    });

    return total;
  }
}

export default Nota;
