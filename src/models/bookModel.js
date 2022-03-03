const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author: {
        type: ObjectId, ref: "MyAuthor"
    },
    price: Number,
    ratings: Number,
    publisher: {
        type: ObjectId, ref: "MyPublisher"
    }

}, { timestamps: true });


module.exports = mongoose.model('newBook1', bookSchema)