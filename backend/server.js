require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const flightRoutes = require('./routes/flight')
const verifyRoutes = require('./routes/verify')
const {verifycertificates} = require('./controllers/verifyController')

const cors = require("cors")
const stripe = require('stripe')(process.env.STRIPEKEY)
const Flight = require('./models/flightModel');
const cloudinary = require("cloudinary").v2
const fse = require("fs-extra")

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

// create a tax rate


app.post("/create-checkout-session", async (req, res) => {
  try {
    const gstTaxRate = await stripe.taxRates.create({ 
      display_name: "GST", percentage: 18, inclusive: false, });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: await Promise.all(req.body.items.map(async (item) => {
        if(item.id === undefined) return;
        const flight = await Flight.findById(item.id);
        let amt;
        if(item.class === "ec") amt = flight.ec_ticket;
        else amt = flight.bs_ticket;
        amt= amt*(item.adults+item.children)+amt/2*(item.infants)
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: flight.flightid,
            },
            unit_amount: amt * 100,
          },
          tax_rates: [gstTaxRate.id],
          quantity: 1,
          //(item.adults + item.children + item.infants)
        };
      })),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    res.json({ url: session.url, state: req.body });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/create-verify", verifycertificates);


const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true
})

// function passwordProtected(req, res, next) {
//   res.set("WWW-Authenticate", "Basic realm='Cloudinary Front-end Upload'")
//   if (req.headers.authorization == "Basic YWRtaW46YWRtaW4=") {
//     next()
//   } else {
//     res.status(401).send("Try again")
//   }
// }

// app.use(passwordProtected)

app.get("/get-signature", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp
    },
    cloudinaryConfig.api_secret
  )
  res.json({ timestamp, signature })
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/verify', verifyRoutes)
app.use('/api', flightRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })  