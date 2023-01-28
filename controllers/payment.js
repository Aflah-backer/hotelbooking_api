const stripe = require("stripe")(
  "sk_test_51LzDYxSGogA8XySWFFZs91ne7aGCzfSw0eDJWRhaKr7qwVCxv7aJCR7A4msCMwyQQTNBFAbOriC6cloA5m3MtlnI004Urz2UKs"
);

const uuid = require("uuid");

exports.StripePayment = async (req, res) => {
  console.log(req.body);
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
