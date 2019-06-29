let mongoose = require('mongoose');

let PublishingHouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

mongoose.model('PublishingHouse', PublishingHouseSchema);

module.exports = mongoose.model('PublishingHouse');