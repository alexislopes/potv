const mongoose = require("mongoose");

const Nota = mongoose.model("Nota");

async function create(nota) {
  return await Nota.create(nota);
}

module.exports = { create };
