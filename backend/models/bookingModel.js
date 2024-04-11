const mongoose = require('mongoose');

const Schema = mongoose.Schema

const bookingSchema = new Schema({
    user_email: {
        type: String,
        required: true
    },
    status: {
        type: String,   
        default: 'Pending'
    },
    option: {
        type: String,
        required: true
    },
    flight1: {
        type: String,
        required: true
    },
    flight2: {
        type: String,
    },
    flight1_id: {   
        type: String,
        required: true
    },
    flight2_id: {   
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    return_date: {
        type: Date,
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    depcode: {
        type: String,
        required: true
    },
    arrcode: {
        type: String,
        required: true
    },
    class:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    discount:{
        type: Number,
        required: true
    },
    display: {
        type: String,
        default: "none"
    },
    passengers: {
        adults:[{
            fname: {
                type: String,
                required: true
            },
            lname: { 
                type: String,
                required: true
            },
            dob:{
                type: Date,
                required: true
            },
            email:{
                type: String,
                required: true
            },
            phone:{ 
                type: String,
                required: true
            },
            gender:{
                type: String,
                required: true
            },
            firstTimeFlier:{
                type: Boolean,
                required: true
            }
        }],
        children:[{
            fname: {
                type: String,
                required: true
            },
            lname: { 
                type: String,
                required: true
            },
            dob:{
                type: Date,
                required: true
            },
            gender:{
                type: String
            }
        }],
        infants:[{
            fname: {
                type: String,
                required: true
            },
            lname: { 
                type: String,
                required: true
            },
            dob:{
                type: Date,
                required: true
            },
            gender:{
                type: String
            }
        }]
    }
});

module.exports = mongoose.model('Booking', bookingSchema);