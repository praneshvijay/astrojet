const User = require('../models/userModel')
const Booking = require('../models/bookingModel')
const Flight = require('../models/flightModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { signupMail, successMail, firsttimeflierMail } = require('./mailer')
const { use } = require('../routes/verify')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {firstName, lastName, email, phoneNo, password, confirmPassword} = req.body

  try {
    const user = await User.signup(firstName, lastName, email, phoneNo, password, confirmPassword)
    // Send a welcome email to the user by taking email and first name from the request body
    signupMail(req, res);
    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// get user details
const getUser = async (req, res) => {
  const { email } = req.params
  try{
    const user = await User.findOne({ email })
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(
      {firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNo: user.phoneNo,
      ffm: user.ffm}
    )
    
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// add booking
const addBooking = async (req, res) => {
  const booking = req.body
  console.log(booking)
  try{
    const bookingobject = await Booking.create(booking)
    res.status(200).json(bookingobject)
    console.log(bookingobject)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const updateBooking = async (email, bookingId) => {
  try {
    // Find the user by email
    const user = await User.findOneAndUpdate(
      { email },
      { $push: { user_bookings: bookingId } },
      { new: true } // Return the updated user document
    );

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    console.log(`Booking ID ${bookingId} added to user ${user.firstName} ${user.lastName}`);
  } catch (error) {
    console.error(error.message);
  }
};

const getBooking = async (req, res) => {
  const { email } = req.params
  try{
    const bookings = await Booking.find({ user_email: email })
    res.status(200).json(bookings)
    console.log(bookings)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const success = async (req, res) => {
  const { email } = req.body
  const status = "Pending"

  try{
    const booking = await Booking.findOne({ user_email: email, status: status })

    let addffm
    if(booking.option === 'one-way'){
      const flight1 = await Flight.findById(booking.flight1_id)
      addffm = flight1.miles-(booking.discount*10)
      req.body.flight1 = flight1
    } else {
      const flight1 = await Flight.findById(booking.flight1_id)
      const flight2 = await Flight.findById(booking.flight2_id)
      addffm = flight1.miles+flight2.miles-(booking.discount*10)
      req.body.flight1 = flight1
      req.body.flight2 = flight2
    }

    const user = await User.findOne({ email })
    let ffm = addffm + user.ffm
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },  
      { ffm: ffm },  
      { new: true }  
    );

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: booking._id },  
      { status: "Success" }, 
      { new: true }  
    );
    
    req.body.booking = updatedBooking

    let length = updatedBooking.passengers.adults.length

    for(let i=0; i<length; i++){
      req.body.adult = updatedBooking.passengers.adults[i]
      await successMail(req, res);
    } 

    for(let i=0; i<length; i++){
      console.log(updatedBooking.passengers.adults[i].firstTimeFlier)
      if(booking.passengers.adults[i].firstTimeFlier === true){
        req.body.adult = updatedBooking.passengers.adults[i]
        await firsttimeflierMail(req, res);
      }
    }

    res.status(200).json(updatedBooking)
  } catch (error){
    res.status(404).json({ message: error.message })
  }
}

const cancel = async (req, res) => {
  const { email } = req.body
  const status = "Pending"
  try {
    const deletedbooking = await Booking.findOneAndDelete({ user_email: email }, { status: status })
    res.status(200).json(deletedbooking)
    //res.status(200).json({ message: "Booking cancelled" })
  }
  catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const getffm = async (req, res) => {
  const { email } = req.params
  try{
    const user = await User.findOne({ email })
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(
      {ffm: user.ffm}
    )
    
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = { signupUser, loginUser, getUser, addBooking, updateBooking, getBooking, success, cancel, getffm}