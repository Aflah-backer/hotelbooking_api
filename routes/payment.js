const express = require("express")
const { StripePayment } = require("../controllers/payment")


const router = express.Router()

router.post("/payment", StripePayment)

module.exports = router