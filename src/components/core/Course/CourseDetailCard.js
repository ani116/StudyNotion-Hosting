import copy from 'copy-to-clipboard'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../../slices/cartSlice'

const CourseDetailCard = ({course, handleBuyCourse}) => {

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    console.log("the user is", user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        thumbnail:thumbnailImage,
        price:currentPrice
    } = course

    const handleAddToCart = () => {
        if(user && user?.accountType === "Instructor"){
            toast.error("you are a Instructor could not buy the course")
            return
        }
        if(token){
            dispatch(addToCart())
        }
    }
    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link Copied to Clipboard")
    }

  return (
    <div>

        <div className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}>
        
            <img 
                src={thumbnailImage}
                alt='thumbnail image'
                className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
            />  
            <div className="space-x-3 pb-4 text-3xl font-semibold">
                Rs. {currentPrice}
            </div>
            <div  className="flex flex-col gap-4">
                <button onClick={
                                    user &&  (course?.studentEnrolled.includes(user._id) ?
                                    () => navigate("/dashboard/enrolled-courses") : 
                                    () => handleBuyCourse())

                    }
                    className="bg-yellow-300 px-8 py-2 rounded-lg"
                >

                    {
                        // user && course?.studentEnrolled.includes(user._id) ? "Go to Course" : "Buy Now"
                        user && (course?.studentEnrolled.includes(user._id)) ?  "Go to Course" : "Buy Now" 
                    }


                </button>
            
                {/* {
                    user ? (
                        !course.studentEnrolled.includes(user._id) && (
                            <button onClick={ () => handleAddToCart(course)} className='bg-yellow-300 w-fit'>
                                Add to Cart
                            </button>
                        )
                    ) :
                    (
                        <div></div>
                    )
                } */}
                    
            </div>

            <div>
                <p className="pb-3 pt-6 text-center text-sm text-richblack-25">30 Day Money Back Gurantee</p>
                {/* <p className={`my-2 text-xl font-semibold `}>this Course Includes:</p>
                <div className='flex flex-col gap-y-3'>
                    {
                        course?.instructions?.map((item, index) => {
                            <p className='flex gap-2' key={index}>
                                <span>{item}</span>
                            </p>
                        })
                    }
                </div> */}
                <button onClick={ () => handleShare()} className="mx-auto flex items-center gap-2 py-6 text-yellow-100 ">
                    Share
                </button>
            </div>
            
            

        </div>

    </div>

  )
}

export default CourseDetailCard
