const ContactUs = require("../models/ContactUs")
require("dotenv").config()

const contactUs = async(req, res) => {
    try {
        const {firstName, lastName, email, phone, message} = req.body;

        // if(!email || !firstName || !lastName || !message || !phone){
        //     res.status(401).json({
        //         success:false,
        //         message:"Please Fill all the Data"
        //     })
        // }

        const detail = await ContactUs.create({
            email,
            firstName,
            lastName,
            message,
            phone
        })

        return res.status(200).json({
            success:true,
            data:detail,
            message:"Message sent Successfully"
        })

    } 
    catch (error) {
        console.log("error is:", error)
        return res.status(400).json({
            success:false,
            message:"message Not sent successfully"
        })
    }
}

module.exports  = {contactUs}
