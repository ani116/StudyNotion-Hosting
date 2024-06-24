const express = require("express")
const router = express.Router()

// importing the payment controller
const {capturePayment, verifyPayment, sendPaymentSuccessEmail} = require("../controllers/Payment")

const {auth, isStudent} = require("../middelwares/auth")

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail)

module.exports = router