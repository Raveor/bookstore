let mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    publishYear: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    },
    bookType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "BookType"
    },
    publishingHouse: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "PublishingHouse"
    }
});

mongoose.model('Book', BookSchema);

module.exports = mongoose.model('Book');
