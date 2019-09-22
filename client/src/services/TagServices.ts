import axios from "axios";

export const tagServices = {
  async fetchTags() {
    const res = await axios.get("/tag");
    return res;
  }
};
