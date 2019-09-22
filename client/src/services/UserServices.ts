import axios from "axios";
// import User from "@/models/User";

export const userServices = {
  async fetchUser(id: string) {
    const res = await axios.get("/userById", { params: { id: id } });
    return res.data.item;
  },

  async fetchUserByEmail(email: string) {
    const res = await axios.get("/userByEmail", { params: { email: email } });
    return res.data.user;
  },

  async fetchUsers() {
    const res = await axios.get("/users");
    return res;
  },

  async createUser(user: any) {
    const res = await axios.post("/user", user);
    return res;
  },

  async atualizaUsuario(item: any) {
    const res = await axios.put("/user", item);
    return res;
  }
};
