class PriceData {
  id: string;
  price: number;
  brand: string;
  timestamp: number;
  local: string;
  kgData: KgData;

  constructor(
    id: string,
    price: number,
    brand: string,
    timestamp: number,
    local: string,
    kgData: KgData
  ) {
    this.id = id;
    this.price = price;
    this.brand = brand;
    this.timestamp = timestamp;
    this.local = local;
    this.kgData = kgData;
  }
}
