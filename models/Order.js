let mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    books: {
        type: [{
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Book"
            },
            quantity: {
                type: Number,
                require: true
            }
        }],
        required: true
    }
});

mongoose.model('Order', OrderSchema);

module.exports = mongoose.model('Order');