const mongoose = require("mongoose");

const Item = mongoose.model("Item");

async function create(item) {
  return await Item.create(item);
}

async function find() {
  return await Item.find({}).populate("priceData");
}

async function findById(id) {
  return await Item.findById({ _id: id }).populate("priceData");
}

async function update(id, item) {
  return await Item.findByIdAndUpdate(id, item).populate("priceData");
}

async function updatePriceData(id, value) {
  const item = await Item.findById(id);
  var priceData = item.priceData;
  priceData.push(value);
  await Item.findByIdAndUpdate(id, { priceData: priceData });
  return item;
}

async function deleteItem(id) {
  return await Item.findByIdAndDelete(id).populate("priceData");
}

async function findByName(name) {
  return await Item.find({ name: name }).populate("priceData");
}

module.exports = {
  create,
  find,
  findByName,
  findById,
  update,
  updatePriceData,
  deleteItem
};
