const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: String,
    price: Number
})

mongoose.model('items', ItemSchema);