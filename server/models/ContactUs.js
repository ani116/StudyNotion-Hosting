const mongoose = require("mongoose")


const contactUsSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String
        },
        email:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        
    }
)

module.exports = mongoose.model("ContactUs", contactUsSchema);