import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";

const { studentEndpoint } = require("../apis");

const {
    ENROLL_STUDENT_TO_COURSE_API
} = studentEndpoint

export async function enrollStudentToCourse({courseId, user}, token, navigate){
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", ENROLL_STUDENT_TO_COURSE_API, {courseId, user}, {Authorization: `Bearer ${token}`})
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        navigate("/dashboard/enrolled-courses")
    } 
    catch (error) {
        console.log("the error in enrolling the student is", error)
    }
    toast.dismiss(toastId)
}