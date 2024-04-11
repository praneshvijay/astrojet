const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flightSchema = new Schema({
    flightid: {
        type: String,
        required: [true, 'name must be provided']
    },
    source: {
        type: String
    },
    destination: {
        type: String
    },
    departure: {
        type: String
    },
    arrival: {
        type: String
    },
    days:{
        type: Array
    },
    totalSeats: {
        businessClass:{
            type: Number,
            default: 10
        },
        economyClass:{
            type: Number,
            default: 130
        }
    },
    seatsBooked:{
        businessClass:{
            type: Number,
            default: 0
        },
        economyClass:{
            type: Number,
            default: 0
        }
    },
    ec_ticket:{
        type: Number
    },
    bs_ticket:{
        type: Number
    },
    miles:{
        type: Number
    },
    }
);

module.exports = mongoose.model('Flight', flightSchema);