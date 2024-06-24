const express = require("express")
const router = express.Router()


// importing Courses Controller
const {createCourse, getAllCourses, getCourseDetail, getInstructorCourses, deleteCourse, enrollWithcourse, getFullCourseDetails} = require("../controllers/Course")

// importing Category controller
const {createCategory, getAllCategory, categoryPageDetail} = require("../controllers/Category")

// importing Section controller
const {createSection, updateSection, deleteSection} = require("../controllers/Section")

// improting SubSection controller
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection")

// importing RatingAndReviews controller
const {createRatingAndReviews, getAllRating, getAverageRating} = require("../controllers/RatingAndReviews")

// importing Middlewares
const {auth, isStudent, isInstructor, isAdmin} = require("../middelwares/auth")


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************



// course, section and Subsection Can only be created by Instructor
router.post("/createCourse", auth, isInstructor, createCourse)

router.post("/addSection", auth, isInstructor, createSection)

router.post("/updateSection", auth, isInstructor, updateSection)

router.post("/deleteSection", auth, isInstructor, deleteSection)

router.post("/addSubSection", auth, isInstructor, createSubSection)

router.get("/fetchInstructorCourses", auth, isInstructor, getInstructorCourses)

router.post("/updateSubSection", auth, isInstructor, updateSubSection)

router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)

router.delete("/deleteCourse", auth, isInstructor, deleteCourse)

router.get("/getAllCourses", getAllCourses)

router.post("/getCourseDetail", getCourseDetail)

router.post("/getFullCourseDetails", auth, isStudent, getFullCourseDetails)

// router.post("/deleteCourse", )


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)

router.post("/getCategoryPageDetails", categoryPageDetail )

router.get("/showAllCategories", getAllCategory)


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

// only rating and reviews can be given by the Student
router.post("/createRating", auth, isStudent, createRatingAndReviews)

router.get("/getAverageRating", getAverageRating)

router.get("/getReviews", getAllRating)

// adding a course into student and studentEnrolled into course
router.post("/enrollingStudentInCourse", auth, isStudent, enrollWithcourse)  // created because Payment integration is not working


module.exports = router