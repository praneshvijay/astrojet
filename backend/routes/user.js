const express = require('express')

// controller functions
const { loginUser, signupUser, getUser, addBooking, updateBooking, getBooking, success, cancel, getffm } = require('../controllers/userController')
const { signupMail } = require('../controllers/mailer')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// signup mail route
router.post('/signupmail', signupMail)

// get user details 
router.get('/getuser/:email', getUser)

// add booking
router.post('/addbooking', addBooking)

router.post('/updatebooking', updateBooking)

// get all the bookings of a user
router.get('/getbooking/:email', getBooking)

// updates on successful payment
router.post('/success', success)

router.post('/cancel', cancel)

router.get('/getffm/:email', getffm)

module.exports = router