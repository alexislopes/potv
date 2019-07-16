const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: {type: String, required: [true, 'O nome do item é obrigatório.']},
    priceData: {
        price: {type: Number, require: [true, 'O preço do item é obrigatório.']},
        timestamp: {type: Number},
        local: {type: String}
    } 
})

module.exports = mongoose.model('Item', ItemSchema);