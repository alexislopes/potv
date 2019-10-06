import axios from "axios";
import PriceData from "../models/PriceData";

export const priceDataServices = {
  async create(price: any) {
    const res = await axios.post("/price", price);
    const priceData = new PriceData(res.data.price);
    console.log(priceData);
    return priceData;
  },

  async find() {
    const priceDataList: Object[] = [];
    const res = await axios.get("/price");
    console.log(res);
    res.data.prices.forEach((price: any) => {
      priceDataList.push(new PriceData(price));
    });
    console.log(priceDataList);
    return priceDataList;
  }
};
