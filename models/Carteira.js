const mongoose = require("mongoose");
const { Schema } = mongoose;

const CarteiraSchema = new Schema({
  sources: [Object]
});

module.exports = mongoose.model("Carteira", CarteiraSchema);
