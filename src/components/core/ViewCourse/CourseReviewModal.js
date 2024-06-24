import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { createRating } from '../../../services/operation/courseDetailsAPI'
import ReactStars from "react-rating-stars-component"

const CourseReviewModal = ({setReviewModal}) => {

    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const {courseEntireData} = useSelector((state) => state.viewCourse)

    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors}
    } = useForm()

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, [])

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating)
    }

    const onSubmit = async(data) => {
        console.log("on submit of add review")
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience
            },
            token
        )
        setReviewModal(false)
    }

    const handleCloseModal = () => {
        setReviewModal(false)
    }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
            {/* Model header */}
            <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5" >
                <p className="text-xl font-semibold text-richblack-5">Add Review</p>
                <button
                    onClick={handleCloseModal}
                    className="text-2xl text-richblack-5"
                >
                    Cancel
                </button>
            </div>

            {/* Modal Body */}
            <div  className="p-6">

                <div className="flex items-center justify-center gap-x-4">
                    <img 
                        src={user?.image}
                        alt='user Image'
                        className='aspect-square w-[50px] rounded-full object-cover'
                    />
                    <div>
                        <p className="font-semibold text-richblack-5">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-richblack-5">Posting Publically</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col items-center">

                    <ReactStars 
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor='#ffd077'
                    />
                    <div className="flex w-11/12 flex-col space-y-2">
                        <label className="text-sm text-richblack-5">
                            Add your Experiece
                        </label>
                        <textarea 
                            id='courseExperience'
                            placeholder='Add You Experience Here'
                            {...register("courseExperience", {required:true})}
                            className="form-style resize-x-none min-h-[130px] w-full"
                        />
                        {
                            errors.courseExperience && (
                                <div>
                                    Please Add your Experience
                                </div>
                            )
                        }
                        {/* Cancel and Save button */}
                        <div className="mt-6 flex w-11/12 justify-end gap-x-2">
                            <button onClick={handleCloseModal} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
                                Cancel
                            </button>
                            <button type='submit' className='bg-yellow-300 py-2 px-6 rounded-lg'>
                                Save
                            </button>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal
