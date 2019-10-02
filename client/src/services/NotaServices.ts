import axios from "axios";

export const notaServices = {
  async createNota(nota: any) {
    const res = await axios.post("/nota", nota);
    return res;
  }
};
