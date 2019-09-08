import axios from "axios";

async function fetchItem(id: string) {
  const res = await axios.get("/itemById", { params: { id: id } });
  return new Item(res.data.item);
}

async function fetchItems() {
  const res = await axios.get("/item");
  return res;
}

module.exports = { fetchItem, fetchItems };
