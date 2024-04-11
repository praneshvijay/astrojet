const Flight = require("../models/flightModel");
const stripe = require("stripe")(process.env.STRIPEKEY);

const createpaymentsession =  async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: await Promise.all(req.body.items.map(async (item) => {
          const flight = await Flight.findById(item.id);
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: flight.flightid,
              },
              unit_amount: flight.ec_ticket * 100,
            },
            quantity: item.quantity,
          };
        })),
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  module.exports = { createpaymentsession };