import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetCourseState, setStep } from '../../../../slices/courseSlice'

const CoursePublishForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goBack = () => {
        dispatch(setStep(2))
    }

    const reset = () => {
        dispatch(resetCourseState())
        dispatch(setStep(1))
    }

  return (
    <div className='rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
        
        <p>Want to Make Changes</p>
        <div className='flex justify-between mt-10'>
            <button onClick={() => goBack()} className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'>
                Go Back
            </button>
            <button onClick={() => reset()} className='flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-300 py-[8px] px-[20px] font-semibold text-richblack-900'>
                Finish
            </button>
        </div>

    </div>
  )
}

export default CoursePublishForm
