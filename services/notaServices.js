const mongoose = require("mongoose");

const Nota = mongoose.model("Nota");

async function create(nota) {
  return await Nota.create(nota);
}

async function find() {
  const notas = await Nota.find({})
    .populate("items.item")
    .populate("items.fixedPriceData");

  console.log(notas);
  return notas;
}

async function findById(id) {
  return await Nota.findById({ _id: id })
    .populate("items.item")
    .populate("items.fixedPriceData");
}

module.exports = { create, find, findById };
