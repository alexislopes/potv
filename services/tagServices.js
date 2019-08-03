const mongoose = require("mongoose");

const Tag = mongoose.model('Tag');

async function create (tag)  {
    return await Tag.create(tag)
}

async function find(){
    return await Tag.find({});
}

async function update(id, tag){
    return await Tag.findByIdAndUpdate(id, tag);
}

async function deleteTag(id) {
    return await Tag.findOneAndDelete(id);
}

module.exports = { create, find, update, deleteTag };