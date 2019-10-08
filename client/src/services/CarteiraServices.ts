import axios from "axios";
import Carteira from "@/models/Carteria";

export const carteiraServices = {
  async find() {
    const carteira = await axios.get("/carteira");
    return carteira.data.carteiras[0]
      ? new Carteira(carteira.data.carteiras[0])
      : null;
  },

  async update(id: any, nova: any) {
    const carteira = await axios.put("/carteira", { id: id, nova: nova });
    return carteira;
  },

  async create(carteira: any) {
    const c = await axios.post("/carteira", carteira);
    return new Carteira(c.data.carteira);
  }
};
