import axios from "axios";
import Nota from "@/models/Nota";

export const notaServices = {
  async createNota(nota: any) {
    const res = await axios.post("/nota", nota);
    return res;
  },

  async find() {
    let novanotas: any[] = [];
    const res = await axios.get("/nota");
    res.data.notas.forEach((nota: any) => {
      novanotas.push(new Nota(nota));
    });

    console.log(res);
    return novanotas;
  },

  async findById(id: string) {
    let nota = null;
    await axios.get("/notaById", { params: { id: id } }).then((res: any) => {
      nota = res.data.nota;
    });
    console.log(nota);
    return new Nota(nota);
  }
};
