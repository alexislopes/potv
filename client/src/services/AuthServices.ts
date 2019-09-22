import axios from "axios";

export const authServices = {
  async login(login: any) {
    return axios.post("/login", login);
  },

  async validade(token: any) {
    return axios.post("/validade", token);
  }
};
