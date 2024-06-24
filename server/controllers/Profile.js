const Profile = require("../models/Profile")
const User  = require("../models/User")
const Course = require("../models/Course")
const { populate } = require("../models/Category")

// updateProfile
const updateProfile = async(req, res) => {
    try {
        
        console.log("before data given to backend")
        const {gender, contactNumber, dateOfBirth="", about=""} = req.body;
        console.log("After data given to backend")
        const userId = req.user.id;

        if (!gender || !contactNumber) 
        {
            
            return res.status(401).json({
                success:false,
                message:"Required All Fields"
            })
        }

        // find User Details
        const userDetail = await User.findById(userId)
        console.log("user is finded")

        // find profile
        const profileId = userDetail.additionalDetails;
        const profileDetail = await Profile.findById(profileId)
        console.log("profile if finded")
        // Update Profile   // here we have already created a object in user so we don't need user update function. You can also use update method if you want

        console.log("Befor saving the backend data")
        profileDetail.gender = gender
        profileDetail.dateOfBirth = dateOfBirth;
        profileDetail.about = about
        profileDetail.contactNumber = contactNumber

        await profileDetail.save() 

        console.log("Befor saving the backend data")

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profile: profileDetail
        })

    } catch (error) {
        console.log("Error in updating the Profile", error)
        return res.status(401).json({

            success:false,
            message:"Error in updating the Profile "
        })
    }
}

// deleteAccount
const deleteAccount = async(req, res) => {
    try {
        
        const userId = req.user.id;
        const userDetail = await User.findById(userId)
        if (!userDetail) {
            return res.status(401).json({
                success:false,
                message:"User Not Found"
            })
        }

        const profileId = userDetail.additionalDetails
        const courseId = userDetail.courses

        await Profile.findByIdAndDelete(profileId)

        await Course.findByIdAndDelete(courseId)

        await User.findByIdAndDelete(userId)

        return res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
        

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Error in deleting the user "
        })
    }
}

// getUserAllDetail
const getUserAllDetail = async(req, res) => {
    try {
        
        const userId = req.user.id;

        if(!userId)
        {
            return res.status(401).json({
                success:false,
                message:"User Not Found"
            })
        }

        const userDetail = await User.findById(userId).populate("additionalDetails").exec()

        return res.status(200).json({
            success:true,
            message:"Fetched User successfully",
            data: userDetail
        })

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success:false,
            message:"Error in Fetching the user "
        })
    }
}

const getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        })
        .exec()
        console.log("the user Details is ", userDetails)
      if (!userDetails) {
        console.log("couldn't find the user")
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
        console.log("error while getting all the data")
      return res.status(500).json({
        success: false,
        
        message: error.message,
      })
    }
};

const instructorDashboard = async(req, res) => {
    try {
        
        const userId = req.user.id
        const courseDetails = await Course.find({instructor: userId})
        const courseData = courseDetails.map((course) => {
            const totalStudentEnrolled = course.studentEnrolled.length;
            const totalAmountGenerated = totalStudentEnrolled * course.price

            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentEnrolled,
                totalAmountGenerated
            }
            return courseDataWithStats
        })
        res.status(200).json({
            success:true,
            data:courseData
        })

    } catch (error) {
        console.log("error while creating instructor dashboard", error)
        return res.status(404).json({
            success:false,
            message:"error while creating instructor dashboard"
        })
    }
}

module.exports = {updateProfile, deleteAccount, getUserAllDetail, getEnrolledCourses, instructorDashboard}