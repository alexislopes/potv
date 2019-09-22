class KgData {
  id: string;
  price: number;
  kg: number;

  constructor(id: string, price: number, kg: number) {
    this.id = id;
    this.price = price;
    this.kg = kg;
  }

  totalPrice() {
    return this.kg * this.price;
  }
}
