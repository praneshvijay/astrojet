const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: { 
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNo : {
    type : Number,
    required: true
  },
  password : {
    type : String,
    required: true
  },
  ffm: {
    type: Number,
    default:0
  }
})

// static signup method
userSchema.statics.signup = async function(firstName, lastName, email, phoneNo, password, confirmPassword) {

  // validation
  if (!email || !password || !firstName || !lastName || !phoneNo || !confirmPassword) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password must contain 8-16 characters, a number (0-9), a lowercase letter (a-z) and an uppercase letter (A-Z). Special characters, except periods (.), commas (,) tildes (~) and brackets (< >), are allowed.')
  }
  if (password !== confirmPassword) {
    throw Error('Passwords do not match')
  }
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash, firstName, lastName, phoneNo})

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)