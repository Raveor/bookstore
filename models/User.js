let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    isAdmin: {
        type: Boolean
    }
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
