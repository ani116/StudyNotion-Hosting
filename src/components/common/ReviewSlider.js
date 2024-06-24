import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from "swiper/react"

import "swiper/css" 
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {FreeMode, Pagination, Autoplay, Navigation} from 'swiper'
import ReactStars from "react-rating-stars-component"
import { courseEndpoints } from '../../services/apis'
import { apiConnector } from '../../services/apiconnector'
import { FaStar } from 'react-icons/fa6'

const ReviewSlider = () => {
    const { 
        REVIEWS_DETAILS_API
    } = courseEndpoints
 
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15

    useEffect(() => {
        
        const fetchAllReviews = async() => {
            
            const response = await apiConnector("GET", REVIEWS_DETAILS_API)
            console.log("All reviews", response)
            
            setReviews(response?.data?.data)

            
        }
        fetchAllReviews()
    }, [])

    console.log("printing review", reviews)

  return (
    <div className='text-white'>
        <div className='h-[190px] max-w-maxContent'>
            <Swiper 
                slidesPerView={4}
                spaceBetween={24}
                loop={true}
                freeMode={true}
                autoplay={{
                    delay: 2500
                }}
                // modules={[FreeMode, Pagination, Autoplay]}
                className='w-full'
            >
                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <img 
                                src={review?.user?.image ? 
                                    review?.user?.image : 
                                    `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}%20${review?.user?.lastName}`
                                }
                                alt='profile pic'
                                className='h-9 w-9 object-cover rounded-full'
                            />
                            <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                            <p>{review?.course?.courseName}</p>
                            <p>
                                {review.review}
                            </p>
                            <p>{review.rating.toFixed(1)}</p>
                            <ReactStars 
                                count={5}
                                value={review.rating}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar />}
                                // fullIcon={<FaStar />}
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    </div>
  )
}

export default ReviewSlider
