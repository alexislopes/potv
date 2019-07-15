const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: String,
    dataPrice: {
        price: Number,
        timestamp: Number,
        local: String
    }
})

mongoose.model('items', ItemSchema);