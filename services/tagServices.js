const mongoose = require("mongoose");

const Tag = mongoose.model('Tag');

async function create (tag)  {
    return await Tag.create(tag)
}

async function find(){
    return await Tag.find({});
}

module.exports = { create, find };