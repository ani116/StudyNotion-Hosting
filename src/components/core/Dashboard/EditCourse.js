import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RenderStep from './AddCourse/RenderStep'
import { getCourseDetail } from '../../../services/operation/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../slices/courseSlice'

const EditCourse = () => {

    const {courseId} = useParams()
    const {course} = useSelector((state) => state.course)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const {token} = useSelector((state) => state.auth)

    useEffect( () => {
        ;(async() => {
            setLoading(true)
            const result = await getCourseDetail(courseId, token)
            if (result?.courseDetails) {
            dispatch(setEditCourse(true))
            dispatch(setCourse(result?.courseDetails))
      }
            setLoading(false)
        })()
    },[] )

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    

  return (
    <div>
      
      <h1>Edit Course</h1>
      <div>
        {
            course ? (<RenderStep />) : (<p>Course Not Found</p>)
        }
      </div>

    </div>
  )
}

export default EditCourse
