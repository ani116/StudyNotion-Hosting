const Course = require("../models/Course");
const Category = require("../models/Category")
const User = require("../models/User")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
require("dotenv").config()


const uploadImageToCloudinary = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");


const createCourse = async (req, res) => {

    try{
        const {courseName, 
                courseDescription, 
                whatYouWillLearn, 
                price, 
                category, 
                // status, 
                instructions
            } = req.body;

        const thumbnail = req.files.thumbnailImage;

        console.log("Before validation")
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) 
        {
            return res.status(401).json({
                success:false,
                message:"Enter All Details"
            })
        }
        console.log("After validation")

        // let courseStatus = status; // Declare a new variable to hold the status value
        // if (!courseStatus || courseStatus === undefined) {
        //     courseStatus = "Draft";
        // }

        // check for instructor
        console.log("Before Verification")
        const userId = req.user.id;
        const instructorDetail = await User.findById(userId, {accountType:"Instructor"})
        console.log(instructorDetail)
        console.log("After Verification")

        if(!instructorDetail)
        {
            return res.status(401).json({
                success:false,
                message:"Instructor Not Find"
            })
        }

        // check given category is valide or not
        const categoryDetails = await Category.findById(category)     // here category is in the form of id
        if(!categoryDetails)
        {
            return res.status(401).json({
                success:false,
                message:"category Not Find"
            })
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)
        
        
        // create an entry for New Course
        const newCourse = await Course.create({ courseName, 
                                                courseDescription, 
                                                instructor: 
                                                instructorDetail._id, 
                                                whatYouWillLearn, 
                                                price, 
                                                category:categoryDetails._id, 
                                                thumbnail:thumbnailImage.secure_url,
                                                // status:status, 
                                                instructions:instructions})

        // add the new course to Instructor Schema
        await User.findByIdAndUpdate({_id: instructorDetail._id}, 
                                    { $push : {
                                            courses: newCourse._id
                                        }  
                                    },
                                    {new:true}
                                )

        // update Category Array
        await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);
    
        return res.status(200).json({
            success:true, 
            message:"Course Create Successfully",
            data: newCourse
        })
    }
    catch(error)
    {
        console.log(error)
        return res.status(401).json({
            success:false,
            message:"something went wrond whilt create the Course"
        })
    }
}

const editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

const getAllCourses = async (req, res) => {
    try {
        
        const allCourses = await Course.find({},    {
                                                    courseName:true,
                                                    courseDescription:true,
                                                    price:true,
                                                    tag:true,
                                                    whatYouWillLearn:true,
                                                    thumbnail:true
                                                }
                                            ).populate("Instructor").exec()
                                            
        return res.status(200).json({
            success:true, 
            message:"Data fetched successfully",
            allCourses
        })

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"something went wrong while fetching the data"
        })
    }
}

// getCourseDetail or fetchCourseDetails
const getCourseDetail = async(req, res) => {
    try {
        
        const {courseId} = req.body;
        // const {courseId} = req.params



        const findCourse = await Course.findOne({_id: courseId})
        .populate({
          path:"courseContent",
          populate:{
            path:"subSection",
            select:"-videoUrl"
          }
        })
        .populate(
            {
                path:"instructor",
                populate:{
                    path: "additionalDetails"
                }
            }
         )
        .populate("category")
        .populate("ratingAndReviews")
        .exec()

        

        if(!findCourse)
          {
              return res.status(401).json({
                  success:false,
                  message:"Course Not Found"
              })
          }
  

    

        console.log(JSON.stringify(findCourse, null, 2));

        return res.status(200).json({
            success:true,
            message:"Course found",
            data: findCourse
        })

    } 
    catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went Wrong",
            error: console.log(error)
        })
    }
}

// get full courseDetail of particular course
const getFullCourseDetails = async(req, res) => {
  try {
    const {courseId} = req.body;
    const userId = req.user.id
    const courseDetails = await Course.findOne({_id: courseId})
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .exec()

      // let courseProgressCount = await CourseProgress.findOne({courseId:courseId, userId: userId})

      // if(!courseProgressCount){
      //   console.error(`CourseProgress not found for courseId: ${courseId} and userId: ${userId}`);
      //   return res.status(404).json({
      //     success:false,
      //     message:"Course progress count not found"
      //   })
      // }

      let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success:true,
      data:{
        courseDetails,
        totalDuration,
        // completedVideos: courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : [],

      },
      message:"Fetch the Full course Data successfully"
    })

  } 
  catch (error) {
    console.log("getFullCourseDetails error is ", error)
    return res.status(401).json({
      success:false,
      message:"Something went Wrong",
     
  })
  }
}

const getInstructorCourses = async(req, res) => {
  try {
    const instructorId = req.user.id

    // find course by instructor id
    const instructorCourses = await Course.find({instructor: instructorId})

    res.status(200).json({
      success:true,
      message:"fetched all courses of instructor",
      data: instructorCourses
    })

  } 
  catch (error) {
    console.log("error while fetching the course", error)
    res.status(404).json({
      success:false,
      message:"Something went Wrong",
      error: console.log(error),
      
    })
  }
}

// Delete the Course
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error("the error is ",error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

const enrollWithcourse = async(req, res) => {
  try {
    const {courseId, user} = req.body
   
    
    const userId = await User.findById(user._id)

    if(!userId){
      return res.status(500).json({
        success: false,
        message: "provide user correctly in backend",
        
      })
    }

    if(!courseId ){
      return res.status(500).json({
        success: false,
        message: "provide the all field in backend",
        
      })
    }

    const courseProgress = await CourseProgress.create({
      courseId: courseId,
      userId: userId,
      completedVideos:[]
    })

    const course = await Course.findByIdAndUpdate(courseId, {
      $push:{
        studentEnrolled: userId
      }}, {new: true}
    )

    if(!course){
      return res.status(401).json({
        success:false,
        message:"course not found"
      })
    }

    const insertCourseInUser = await User.findByIdAndUpdate(userId, 
                                                                {$push:{
                                                                  courses: courseId,
                                                                  courseProgress:courseProgress
                                                                }}, 
                                                                {new:true})
    if(!insertCourseInUser){
      return res.status(401).json({
        success:false,
        message:"user not found"
      })
    }
  
    console.log(insertCourseInUser)

    // // send email to student
    // const emailResponse = await mailSender(
    //   enrolledStudents.email,
    //   `Successfully enrolled into ${enrolledCourse.courseName}`,
    //   courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
    // )
    return res.status(200).json({
      success:true,
      data:insertCourseInUser
    })


  } 
  catch (error) {
    console.log(error)
            return res.status(401).json({
                success:false,
                message:error.message
            })
  }
}

module.exports = {createCourse, getAllCourses, getCourseDetail, editCourse, getInstructorCourses, deleteCourse, enrollWithcourse, getFullCourseDetails}