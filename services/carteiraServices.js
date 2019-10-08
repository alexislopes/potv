const mongoose = require("mongoose");

const Carteira = mongoose.model("Carteira");

async function create(nota) {
  return await Carteira.create(nota);
}

async function find() {
  const carteiras = await Carteira.find({});

  return carteiras;
}

async function update(id, carteira) {
  return await Carteira.findByIdAndUpdate(id, carteira);
}

module.exports = { create, find, update };
