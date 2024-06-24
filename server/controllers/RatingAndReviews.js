const { json } = require("express");
const Course = require("../models/Course");
const RatingAndReviews = require("../models/RatingAndReviews");
const { default: mongoose } = require("mongoose");

const createRatingAndReviews = async (req, res) => {
    try {
        
        const {courseId, rating, review} = req.body;
        const userId = req.user.id

        

        if(!courseId || !rating || !review || !userId) 
        {
            return res.status(401).json({
                success:false,
                message:"Enter All Field"
            })
        }

        // find student is enrolled in the course or not
        const studentEnrolled = await Course.findOne({_id: courseId}, {studentEnrolled: {$elemMatch : {$eq: userId} }})

        if(!studentEnrolled)
        {
            return res.status(401).json({
                success:false,
                message:"You are not Enrolled in this course"
            })
        }

        // find student is giving review first time, if not then return false statement
        const alreadyReviewed = await RatingAndReviews.findOne({courses: courseId},
                                                                {user: userId},
                                                                
        )

        if(alreadyReviewed)
        {
            return res.status(401).json({
                success:false,
                message:"You already reviewed this course"
            })
        }
        
        const newRatingAndReview = await RatingAndReviews.create({rating: rating, review: review, course: courseId, user: userId})

        
        const updatedCourse = await Course.findByIdAndUpdate(
                                                                courseId,
                                                                {
                                                                    $push:{
                                                                        ratingAndReviews: newRatingAndReview._id
                                                                    }
                                                                },
                                                                {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Review and Rating Successfully created",
            data:updatedCourse
        })

    } 
    catch (error) {
        return res.status(401).json({
            success:false,
            message:" Error in  creating Rating and Reviews"
        })
    }
}

// Average Rating 
const getAverageRating = async(req, res) => {
    try {
        
        // FIRST WAY => 

        // const {courseId} = req.body;
        // if (!courseId) {
        //     return res.status(401).json({
        //         success:false,
        //         message:"course Id is not valid"
        //     })
        // }

        // const courseDetail = await Course.findById({_id: courseId})

        // const findingRating = await RatingAndReviews.find({courseDetail: courseDetail._id})

        // let total = 0;
        // for (let i=0; i<findingRating.length ; i++) {

        //     total = total + findingRating[i].rating;
        // }

        // const avgRating = total / findingRating.length;
        
        // return res.status(200).json({
        //     success:true,
        //     message:"Your Average rating is",
        //     data: avgRating
        // })
        

        // SECOND WAY => 

        const courseId = req.body.courseId

        const result = await RatingAndReviews.aggregate([
            {
                // it will match the course with the ratingAndReviews
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                // it will group the given condition
                $group:{
                    _id: null,
                    averageRating: {$avg: "rating"},
                }
            }
        ])

        if(result.length > 0)
        {
            return res.status(200).json({
                success:true,
                message:"Your Average rating is",
                data: result[0].averageRating
            })
        }
        // if on rating is present
        return res.status(401).json({
            success:false,
            message:" Error in getting average rating"

        })


    } 
    catch (error) {
        return res.status(401).json({
            success:false,
            message:" Error in getting average rating"

        })
    }
}

// getAllRating
const getAllRating = async(req, res) => {
    try {
        
        const allRating = await RatingAndReviews.find({})
                                                .sort( {rating: "desc"})
                                                .populate({
                                                    path:'user', 
                                                    select:"firstName lastName email image"
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName"
                                                })
                                                .exec();

        return res.status(200).json({
            success:true,
            message:"all Data is Fetched",
            data: allRating
        })


    } catch (error) {
        return res.status(401).json({
            success:false,
            message:" Error in getting all ratingAndReviews"

        })
    }
}

module.exports = {createRatingAndReviews, getAverageRating, getAllRating}