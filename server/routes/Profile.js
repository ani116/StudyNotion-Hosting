const express = require("express")
const router = express.Router()

// importing Profile controller
const {updateProfile, deleteAccount, getUserAllDetail, getEnrolledCourses, instructorDashboard} = require("../controllers/Profile")

const {auth, isInstructor} = require("../middelwares/auth")
// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
router.delete("/deleteProfile",auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getUserAllDetail)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

// get Enrolled Course
router.get("/getEnrolledCourses", auth, getEnrolledCourses)

module.exports = router