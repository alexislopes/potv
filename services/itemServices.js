const mongoose = require("mongoose");

const Item = mongoose.model('Item');

async function create (item)  {
    return await Item.create(item)
}

async function find() {
    return await Item.find({});
}

async function findById(id){
    return await Item.findById({ _id: id });
}

async function update(id, item) {
    return await Item.findByIdAndUpdate(id, item);
}

async function updatePriceData(id, value) {
    const item = await Item.findById(id);
    var priceData = item.priceData;
    priceData.push(value);
    return await Item.findByIdAndUpdate(id, {priceData: priceData})
}

async function deleteItem(id) {
    return await Item.findByIdAndDelete(id);
}

async function findByName(name) {
    return await Item.find({name: name});
}

module.exports = { create, find, findByName,findById, update, updatePriceData, deleteItem };