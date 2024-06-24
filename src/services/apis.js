const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories"
}

export const endpoints = {
    RESETPASSWORD_API : BASE_URL + "/auth/reset-password",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    LOGIN_API: BASE_URL + "/auth/login"
}
export const contactUsEndPoint = {
    CONTACTUS_API: BASE_URL + "/contactus/contact"
}

export const profileEndpoint = {
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard"
}

export const courseEndpoints = {
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse", 
    UPDATE_COURSE_API: BASE_URL + "/course/updateCourse",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    FECTH_INSTRUCTOR_COURSES_API: BASE_URL + "/course/fetchInstructorCourses",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    COURSE_DETAIL_API: BASE_URL + "/course/getCourseDetail",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews"
}

export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails"
}

export const studentEndpoint = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
    ENROLL_STUDENT_TO_COURSE_API: BASE_URL + "/course/enrollingStudentInCourse"
}

