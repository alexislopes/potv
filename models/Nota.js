const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotaSchema = new Schema({
  items: [{ item: mongoose.Schema.Types.ObjectId, quantity: Number }],
  tags: { type: Array },
  timestamp: { type: Number },
  local: { type: String },
  title: { type: String }
});

module.exports = mongoose.model("Nota", NotaSchema);
