let mongoose = require('mongoose');

let BookTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

mongoose.model('BookType', BookTypeSchema);

module.exports = mongoose.model('BookType');