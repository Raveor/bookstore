let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    adminFlag: {
        type: Boolean,
        default: false
    },
    activeFlag: {
        type: Boolean,
        default: true
    }});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');