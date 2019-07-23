const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: {type: String, required: [true, 'O nome do item é obrigatório.']},
    priceData: {
        price: {type: String, require: [true, 'O preço do item é obrigatório.']},
        brand: { type: String, require: [true, 'A marca do item é obrigatória.']},
        timestamp: {type: Number},
        local: {type: String}
    } 
})

module.exports = mongoose.model('Item', ItemSchema);