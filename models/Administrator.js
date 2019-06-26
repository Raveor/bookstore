let mongoose = require('mongoose');

const AdministratorSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

mongoose.model('Administrator', AdministratorSchema);

module.exports = mongoose.model('Administrator');