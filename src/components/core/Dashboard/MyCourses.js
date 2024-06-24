import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { fetchInstructorCourses } from '../../../services/operation/courseDetailsAPI'
import CourseTable from './CourseTable'
import { fetchInstructorCourses } from '../../../services/operation/courseDetailsAPI'

const MyCourses = () => {

    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async() => {
            const result = await fetchInstructorCourses(token)
            console.log("the fetch courses are", result)
            if(result){
                setCourses(result)
            }

        }
        fetchCourses()
    }, [])

  return (
    <div>
      
        <div className="mb-14 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
            <button onClick={() => navigate("/dashboard/add-course")} className='bg-yellow-300 px-8 py-2'>
                Add Courses
            </button>
        </div>
        {
            courses && <CourseTable courses={courses} setCourses={setCourses} />
        }

    </div>
  )
}

export default MyCourses
