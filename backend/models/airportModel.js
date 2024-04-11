const mongoose = require('mongoose');

const Schema = mongoose.Schema

const airportSchema = new Schema({
    name: {
        type: String
    },
    code: {
        type: String
    },
    cityname: {
        type: String
    }
});

module.exports = mongoose.model('Airport', airportSchema);
