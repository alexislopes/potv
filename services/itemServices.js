const mongoose = require("mongoose");

const Item = mongoose.model('Item');

async function create (item)  {
    return await Item.create(item)
}

async function find(){
    return await Item.find({});
}

module.exports = { create, find };