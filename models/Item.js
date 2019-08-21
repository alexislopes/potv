const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: {type: String, required: [true, 'O nome do item é obrigatório.']},
    tags: {type: Array, required: [true, 'Adicione ao menos uma tag']},
    priceData: [
        {
            price: {type: String, require: [true, 'O preço do item é obrigatório.']},
            brand: { type: String },
            timestamp: {type: Number},
            local: {type: String}
        }
    ]
})

module.exports = mongoose.model('Item', ItemSchema);