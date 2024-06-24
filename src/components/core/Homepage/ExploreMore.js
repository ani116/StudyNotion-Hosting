import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Carrer paths"
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabName[0])
    const [course, SetCourse] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCard = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter( (course) => course.tag === value )
        SetCourse(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }

  return (
    <div className='flex flex-col gap-5  '>
    

        <div className='text-4xl fonst-semibold text-center my-10'>
            Unlock The 
            <HighlightText text={" Power of Code"}/>
        </div>

        <div className='hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
            {
                tabName.map((element, index) => {
                    return(
                        <div className={` text-[16px] flex flex-row items-center gap-2 ${
                            currentTab === element
                              ? "bg-richblack-900 text-richblack-5 font-medium"
                              : "text-richblack-200"
                          } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
                        key={index}
                        onClick={ () => setMyCard(element) }
                        >

                            {element}

                        </div>
                    )
                })
            }
        </div>

        
        <div className="hidden lg:block lg:h-[200px]"></div>
        <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
                {
                    course.map((element, index) => {
                        return(
                           
                            <CourseCard
                            key={index}
                            cardData = {element}
                            currentCard = {currentCard} 
                            setCurrentCard = {setCurrentCard}
                            />
                            
                        )
                    })
                }
        </div>
     

    </div>
  )
}

export default ExploreMore
