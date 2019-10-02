import axios from "axios";
import Item from "@/models/Item";

export const itemServices = {
  async fetchItem(id: string) {
    const res = await axios.get("/itemById", { params: { id: id } });
    return res.data.item;
  },

  async fetchItemByName(name: string) {
    const res = await axios.get("itemByName", { params: { name: name } });
    return res.data.item[0];
  },

  async fetchItems() {
    const res = await axios.get("/item");
    return res;
  },

  async createItem(item: any) {
    const res = await axios.post("/item", item);
    return res;
  },

  async deleteItem(id: string) {
    const res = await axios.delete("/item", { params: { id: id } });
    return res;
  },

  async atualizaItem(item: any) {
    const res = await axios.put("/item", item);
    return res;
  },

  async atualizaPriceData(nome: string, priceData: Object) {
    const name = { name: nome };
    var item = { _id: "1" };

    const itemByname = await this.fetchItemByName(nome);

    const iid = itemByname._id;

    const res = await axios.patch("/item", { id: iid, priceData: priceData });

    return { item: itemByname, res: res };
  }
};
