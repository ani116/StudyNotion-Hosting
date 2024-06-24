const express = require("express")
const router = express.Router()


// importing the Auth controller
const {logIn, signUp, sendOtp, changePassword} = require("../controllers/Auth")

// importing ResetPassword controller
const {resetPassword, resetPasswordToken} = require("../controllers/ResetPassword")

// importing auth middleware
const {auth} = require("../middelwares/auth")

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

router.post("/login", logIn)
router.post("/signup", signUp)
router.post("/sendotp", sendOtp)
router.post("/changePassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router