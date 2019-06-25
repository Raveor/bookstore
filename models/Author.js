let mongoose = require('mongoose');

let AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: Number,
        required: true
    }
});

mongoose.model('Author', AuthorSchema);

module.exports = mongoose.model('Author');
