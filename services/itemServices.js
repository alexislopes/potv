const mongoose = require("mongoose");

const Item = mongoose.model('items');

function salva (item)  {
    new Item({name: item.name, price: item.price}).save();
}

async function buscaTodos(){
    return await Item.find({});
}

module.exports = { salva, buscaTodos };