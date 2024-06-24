import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getUserEnrolledCourses } from '../../../services/operation/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar'
import { useNavigate } from 'react-router-dom'

const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate()

    const [enrolledCourses, setEnrolledCourses] = useState(null)

    const getEnrolledCourses = async() => {
        try {
          console.log("befor client side error")
            const response = await getUserEnrolledCourses(token)
            setEnrolledCourses(response?.data);
            console.log("after client side error")
        } 
        catch (error) {
            console.log("enable to fetch the data", error)
        }
    }

    useEffect( () => {
        getEnrolledCourses()
    }, [] )

  return (
    <div>
      
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {

        !enrolledCourses ? (
          <h1 className='text-white'>Loading...</h1>
        ) : !enrolledCourses.length ? 
              (
                <p className="grid h-[10vh] w-full place-content-center text-richblack-5">You have not enrolled any Course yet</p>
              ) : (
                    <div className="my-8 text-richblack-5">
                      <div className="flex rounded-t-lg bg-richblack-500 ">
                        <p className="w-[45%] px-5 py-3">Courses Name</p>
                        {/* <p className="w-1/4 px-2 py-3">Duration</p> */}
                        {/* <p className="flex-1 px-2 py-3">Progress</p> */}
                      </div>
                      {
                        enrolledCourses?.map( (course, index) => (
                          <div key={index} className='flex items-center border border-richblack-700'>

                            <div 
                              className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                              onClick={() => navigate(`/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)}
                            >

                              <img src={course.thumbnail} alt='' className="h-14 w-14 rounded-lg object-cover"/>
                              <div className="flex max-w-xs flex-col gap-2">
                                <p className='font-semibold'>{course.courseName}</p>
                                <p className="text-xs text-richblack-300">{course.courseDescription}</p>
                              </div>
                            </div>

                            <div className="w-1/4 px-2 py-3">
                                <p>{course?.totalDuration}</p>
                            </div>

                            {/* will do in future */}
                            {/* <div>
                              <p>{course.progressPercentage || 0}%</p>
                              <ProgressBar
                                    completed={course.progressPercentage || 0} 
                                    height='8px'
                                    isLabelVisible={false}
                              />
                            </div> */}

                          </div>
                         ) )
                      }
                    </div>
                  )
      }

    </div>
  )
}

export default EnrolledCourses
