const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotaSchema = new Schema({
  items: [mongoose.Schema.Types.ObjectId],
  tags: { type: Array },
  timestamp: { type: Number },
  local: { type: String }
});

module.exports = mongoose.model("Nota", NotaSchema);
