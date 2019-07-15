const mongoose = require("mongoose");

const Item = mongoose.model('items');

function salva (item)  {
    new Item({name: item.name, price: item.price}).save();
}

function buscaPorNome(item){
    return "Olavo"
}

module.exports = { salva, buscaPorNome };