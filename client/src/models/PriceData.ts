class PriceData {
  _id: string;
  price: number;
  brand: string;
  timestamp: number;
  local: string;
  kgData: Object;

  constructor(response: any) {
    this._id = response._id;
    this.price = response.price;
    this.brand = response.brand;
    this.timestamp = response.timestamp;
    this.local = response.local;
    this.kgData = response.kgData;
  }
}

export default PriceData;
