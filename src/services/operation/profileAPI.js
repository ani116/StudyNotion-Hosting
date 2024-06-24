import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { profileEndpoint } from "../apis"

const {
    GET_USER_ENROLLED_COURSES_API,
    UPDATE_PROFILE_API,
    GET_INSTRUCTOR_DATA_API
} = profileEndpoint


export async function getUserEnrolledCourses(token){
    

    try {
        

        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {Authorization: `Bearer ${token}`});

        console.log("Student enrolled in:", response.data);
        

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data; // Return the data directly
    } catch (error) {
        console.log("Error in fetching the data", error);
        toast.error("Error while fetching");
        throw error; // Rethrow the error to be handled by the caller
    }

    
}
export function updateProfile(settingData, token){
    return async(dispatch) => {
        try {
            console.log("before giving the data")
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, settingData, {Authorization: `Bearer ${token}`} )
            console.log("after giving the data")
            console.log("update profile data is", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Profile updated successfully");
        } 
        catch (error) {
        console.log("Error in updating the data", error);
        toast.error("Error while updating");
        throw error;
        }
    }
}

export async function getInstructorData(token){
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {Authorization: `Bearer ${token}`})
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    } 
    catch (error) {
        console.log("error in fetching the instructor data", error)
    }
    toast.dismiss(toastId)
    return result
}