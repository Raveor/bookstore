let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    }
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');