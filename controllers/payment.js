const stripe = require("stripe")(
  "sk_test_51LzDYxSGogA8XySWw2g50ziOPOOoYSvZoR9oQbACfFYgWhtUiPPhQ0uuP3VWggr6psSv9Wyquim9Iei9rU5TQGMa00kggxJT0G"
);

const uuid = require("uuid");

exports.StripePayment = async (req, res) => {
  try {
    const { product, token } = req.body;
    const idempontencyKey = uuid();
    return stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) => {
        stripe.charges.create({}, { idempontencyKey });
      })
      .then((result) => res.status(200).json(result));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
