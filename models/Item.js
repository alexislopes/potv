const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: { type: String, required: [true, "O nome do item é obrigatório."] },
  name_lower: { type: String },
  tags: { type: Array, required: [true, "Adicione ao menos uma tag"] },
  isFraction: { type: Boolean },
  priceData: [{ type: mongoose.Schema.Types.ObjectId, ref: "PriceData" }]
});

module.exports = mongoose.model("Item", ItemSchema);
