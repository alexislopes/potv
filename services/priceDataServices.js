const mongoose = require("mongoose");

const PriceData = mongoose.model("PriceData");

async function create(price) {
  return await PriceData.create(price);
}

async function find() {
  return await PriceData.find({});
}

module.exports = { create, find };
