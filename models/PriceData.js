const mongoose = require("mongoose");
const { Schema } = mongoose;

const PriceDataSchema = new Schema({
  kgData: {
    kg: { type: String },
    kgPrice: { type: String }
  },
  price: {
    type: String,
    require: [true, "O preço do item é obrigatório."]
  },
  brand: { type: String },
  timestamp: { type: Number },
  local: { type: String }
});

module.exports = mongoose.model("PriceData", PriceDataSchema);
