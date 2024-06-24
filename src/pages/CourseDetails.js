import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operation/studentFeaturesAPI';
import { enrollStudentToCourse } from '../services/operation/studentEnrolledWithCourse';
import { getCourseDetail } from '../services/operation/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import toast from 'react-hot-toast';
import CourseDetailCard from '../components/core/Course/CourseDetailCard';


const CourseDetails = () => {

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const {courseId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading} = useSelector((state) => state.profile)
    const {paymentLoading} = useSelector((state) => state.course)

    const [courseData, setCourseData] = useState(null)

    useEffect(() => {
        const fetchCourseDetails = async() => {
            try {
                const response = await getCourseDetail(courseId)
                console.log("The course detail is", response)
                setCourseData(response)
                
            } 
            catch (error) {
                console.log("Error while fetching the data f")
            }
        }
        fetchCourseDetails()
    }, [courseId])
    console.log("courseData is ", courseData)

    const [avgReviewCount, setAvgReviewCount] = useState(0)

    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReviews)
        setAvgReviewCount(count)
    }, [courseData])

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
    useEffect(() => {
        let lectures= 0 ;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0;
        })
        setTotalNoOfLectures(lectures)
    })

    
    const handleBuyCourse = async() => {
        if(token){
            await enrollStudentToCourse({courseId, user}, token, navigate)

            // buyCourse(token, [courseId], user, navigate, dispatch)

        }
        else{
            toast.error("Log In First")
            navigate("/login")
        }
    }

    if(loading || !courseData){
        return <div>
            Loading...
        </div>
    }

    // copying all the data into variables
    const {
        // _id:course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentEnrolled,
        createdAt

    } = courseData?.data
  return (
    <div className='flex flex-col p-8'>

        <div className='relative flex flex-col justify-start gap-4'>

            <p className='text-richblack-5 font-bold'>Course Name: <span className='text-richblack-400'>{courseName}</span></p>
            <p className='text-richblack-5 font-bold'>Course Description: <span className='text-richblack-400'>{courseDescription}</span></p>
            <div className='space-y-4'>
                <p className='text-richblack-5 font-bold'>Reviews: <span className='text-richblack-400'>{ratingAndReviews.length}</span></p>
                <p className='text-richblack-5 font-bold'>Students Enrolled: <span className='text-richblack-400'>{studentEnrolled.length}</span></p>
                
            </div>
            <div>
                <p className='text-richblack-5 font-bold'>Created By: <span className='text-richblack-400'>{instructor?.firstName}</span></p>
                
            </div>
            <div>
                <CourseDetailCard 
                    course={courseData?.data}
                    handleBuyCourse={handleBuyCourse}
                />
            </div>

        </div>


        {/* not do this section */}

        {/* <div>
            <div>
                <p>Course content</p>
            </div>
            <div className='flex gap-3 justify-between'>

                <div>

                    <span>{courseContent.length} section(s)</span>
                    <span>{totalNoOfLectures.length} lectures</span>

                </div>

            </div>
        </div> */}
        
    </div>
  )
}

export default CourseDetails
