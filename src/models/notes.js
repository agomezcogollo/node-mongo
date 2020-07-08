const { Schema, model } = require('mongoose')

const NoteSchema = new Schema({
    tittle: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }

},{
    timestamps: true
});

module.exports = model('notes', NoteSchema)