const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  nome: { type: String, required: [true, "O nome é obrigatório."] },
  email: { type: String, required: [true, "O email é obrigatório."] },
  senha: { type: String, required: [true, "A senha é obrigatório."] },
  cep: { type: String },
  rua: { type: String },
  numero: { type: String },
  bairro: { type: String },
  cidade: { type: String },
  estado: { type: String }
});

module.exports = mongoose.model("User", UserSchema);
