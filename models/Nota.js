const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotaSchema = new Schema({
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: Number,
      fixedPriceData: { type: mongoose.Schema.Types.ObjectId, ref: "PriceData" }
    }
  ],
  tags: { type: Array },
  timestamp: { type: Number },
  local: { type: String },
  title: { type: String }
});

module.exports = mongoose.model("Nota", NotaSchema);
