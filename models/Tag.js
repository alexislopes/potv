const mongoose = require('mongoose');
const { Schema } = mongoose;

const TagSchema = new Schema({
    name: { type: String, required: [true, 'O nome da Tag é obrigatório.'] },
    color: { type: String, required: [true, 'A cor da Tag é obrigatória.'] } 
})

module.exports = mongoose.model('Tag', TagSchema);