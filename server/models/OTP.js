const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")

const otpSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        otp:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            expires: 5*60
        },
        
    }
)

async function sendVerificationMail(email, otp){
    try {
        const mailResponse = await mailSender(email, "Verification Mail From StudyNotion", otp)
        console.log("mail sent Successfull",mailResponse)
    } catch (error) {
        console.log("error while sending the Mail", error)
        throw error
    }
}

otpSchema.pre("save", async function(next){
    await sendVerificationMail(this.email, this.otp)
    next()
} )

module.exports = mongoose.model("OTP", otpSchema)