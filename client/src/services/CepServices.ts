import axios from "axios";

export function getCep(cep: string) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}
