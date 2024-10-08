const mongoose = require("mongoose")


const ratingAndReviews = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    }, 
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    }

})

module.exports = mongoose.model("RatingAndReviews", ratingAndReviews)