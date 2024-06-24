import { resolvePath } from "react-router-dom";
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";
import toast from "react-hot-toast";


const {
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    UPDATE_COURSE_API,
    UPDATE_SECTION_API,
    CREATE_SECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    FECTH_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    COURSE_DETAIL_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API

} = courseEndpoints

export const fetchCourseCategories = async() => {
    let result = []
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("fetched all Category", response)
        if(!response.data.success){
            throw new Error(response.data.message)

        }
        result = response?.data?.data
    } 
    catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}

export const addCourseDetails = async(data, token) => {
    const toastId = toast.loading("Loading....")
    let result = null;
    try {
        console.log("Before backend")
        const response = await apiConnector("POST", CREATE_COURSE_API, data, { Authorization: `Bearer ${token}` });

        console.log("After backend")
        if(!response.data.success){
            throw new Error(response.data.message)

        }
        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } 
    catch (error) {
        console.log("Error while creating the course", error)
        toast.error("Enable to Create Course")
    }
    toast.dismiss(toastId)
    return result;
}

export const editCourseDetails = async(data, token) => {
    let result = null;
    try {
        const response = await apiConnector("POST", UPDATE_COURSE_API, data, {Authorization : `Bearer ${token}`, 'Content-Type': 'multipart/form-data'})
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        console.log("CREATE COURSE API RESPONSE............", response)
        
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } 
    catch (error) {
        console.log("Error while creating the course", error)
        toast.error("Enable to Create Course")
    }
    return result
}


// updateSection
export const updateSection = async(data, token) => {
    let result = "";
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {Authorization: `Bearer ${token}`})

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        console.log("Updated section is", response)
        
        toast.success("section Updated")
        result = response?.data?.data
    } 
    catch (error) {
        console.log("Error while creating the course", error)
        toast.error("Enable to Create Course")
    }
    return result
}


export const createSection = async(data, token) => {
    let result = "";
    try {
        console.log("before making req")
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {Authorization: `Bearer ${token}`})
        console.log("after making req")


        if(!response.data.success){
            throw new Error(response.data.message)
        }
        console.log("Updated section is", response)
        
        toast.success("section Updated")
        result = response?.data?.data
    } 
    catch (error) {
        console.log("Error while creating the section", error)
        toast.error("Enable to Create Course")
    }
    return result
}

// delete a section
export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_SECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Section")
      }
      toast.success("Course Section Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Lecture")
      }
      toast.success("Lecture Deleted")
      result = response?.data?.data
    } catch (error) {
      console.log("DELETE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


// create a subsection
export const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Lecture")
      }
      toast.success("Lecture Added")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  // update a subsection
export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Lecture")
      }
      toast.success("Lecture Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }
  
export const fetchInstructorCourses = async(token) => {
  let result=[]
  const toastId = toast.loading("Loading...")
  try {
    console.log("BEfore api call")
    const response = await apiConnector("GET", FECTH_INSTRUCTOR_COURSES_API, null, {Authorization: `Bearer ${token}`})
    console.log("After api call")
    console.log("INSTRUCTOR COURSES API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    
    result = response?.data?.data    

  } 
  catch (error) {
    console.log("ERROR While Fetching the Courses of instructor............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteCourse = async(data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    console.log("Before delete")
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {Authorization:`Bearer ${token}`})
    console.log("After delete")
    console.log("DELETE COURSE API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } 
  catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
} 

// fetch the course by Id 
export const getCourseDetail = async(courseId) => {
  let result = null
  try {
    const response = await apiConnector("POST", COURSE_DETAIL_API, {courseId})

    console.log("After api call")
    console.log("INSTRUCTOR COURSES API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not get the course Details")
    }
    
    result = response?.data

  } 
  catch (error) {
    console.log("ERROR While Getting the Course details............", error)
    toast.error(error.message)
  }
  return result
}

// get full course authenticate
export const getFullDetailsOfCourse = async(courseId, token) => {
  const toastId = toast.loading("Loading...")
  let result = null;
  try {
    console.log("Before sending to fulldetailcourse")
    const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, {courseId}, 
    {Authorization: `Bearer ${token}`})

    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if(!response.data.success){
      console.log("No resposnse is found")
      throw new Error(response.data.message)
    }

    result = response?.data?.data

  } 
  catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
  }
  toast.dismiss(toastId)
  return result
}

export const createRating = async(data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {Authorization: `Bearer ${token}`})
    console.log("resposns while creating the rating", response)
    if(!response.data.success){
      throw new Error(response.data.message)
    }
    toast.success("Rating Created")

    success = true
   
  } 
  catch (error) {
    console.log("error while creating the raitng and reviews............", error)
  }
  toast.dismiss(toastId)
  return success
}