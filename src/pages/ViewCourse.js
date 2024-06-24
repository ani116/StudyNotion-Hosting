import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operation/courseDetailsAPI'
// import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures, } from '../slices/viewCourseSlice'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from '../slices/viewCourseSlice'
// import { FaLessThan } from 'react-icons/fa'

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false)
    const {courseId} = useParams()
    const {token} = useSelector((state) => state.auth)
    console.log("your token in", token)
    const dispatch = useDispatch()

    
    useEffect(() => {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            console.log("the courseData", courseData)
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent || []))
            dispatch(setCourseEntireData(courseData.courseDetails || {}))
            dispatch(setCompletedLectures(courseData.completedVideos || []))
            let lectures = 0;
            courseData.courseDetails?.cousreContent.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))
        }
        setCourseSpecificDetails()
    },[courseId, token, dispatch])

    useEffect(() => {
        console.log("Review Modal State:", reviewModal); // Add log to track state changes
    }, [reviewModal]);

  return (
    <>
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-6">
                    <Outlet/>
                </div>
            </div>
            {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal}/>)}
        </div>
        
        

    </>
    
  )
}

export default ViewCourse
