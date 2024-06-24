import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setvideoBarActive] = useState("")
    const navigate = useNavigate()
    const {sectionId} = useParams()
    const {subSectionId} =  useParams()
    const location = useLocation()

    
    const {
        courseSectionData=[],
        courseEntireData={},
        completedLectures=[],
        totalNoOfLectures=0
    } = useSelector((state) => state.viewCourse)
    

    console.log('courseSectionData:', courseSectionData);
    console.log('courseEntireData:', courseEntireData);
    console.log('completedLectures:', completedLectures);
    console.log('totalNoOfLectures:', totalNoOfLectures);

    useEffect(()=> {
        
        const functionHandlerApi = async() => {
            if(!courseSectionData.length){
                return 
            }
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
            const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) =>data._id === subSectionId)

            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id
            // set current subSection here
            setvideoBarActive(activeSubSectionId)
            // set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
        }
        functionHandlerApi()
    }, [courseSectionData, courseEntireData, location.pathname])

    const handleReview = () => {
        console.log("Setting review modal to true")
        setReviewModal(true)
        
        
    }

  return (
    <>
    
        <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">

            {/* for button and headings */}
            <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
                {/* for buttons */}
                <div className="flex w-full items-center justify-between">

                    <div onClick={() => navigate("/dashboard/enrolled-courses")} className="flex h-[35px] w-[35px] items-center justify-center px-7 rounded-full cursor-pointer  bg-richblack-100 text-richblack-700 hover:scale-90">
                        Back
                    </div>

                    <div>
                        <button onClick={handleReview} className='bg-yellow-300 py-2 px-8 rounded-lg'>
                            Add Review
                        </button>
                    </div>

                </div>
                
                {/* for heading */}
                <div className="flex flex-col">
                    <p>{courseEntireData?.courseName}</p>
                    <p className="text-sm font-semibold text-richblack-500">{completedLectures?.length} / {totalNoOfLectures}</p>
                </div>
                
            </div>

            {/* for section and subtion */}
            <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                {
                    courseSectionData?.map((section, index) => (
                        <div
                            onClick={() => setActiveStatus(section?._id)}
                            key={section._id || index}
                            className="mt-2 cursor-pointer text-sm text-richblack-5"
                        >
                            
                            {/* section */}
                            <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                                <div className="w-[70%] font-semibold">
                                    {section?.sectionName}
                                </div>
                                {/* hw add a icon arrow */}
                            </div>

                            {/* SubSection */}
                            <div>
                                {
                                    activeStatus === section?._id && (
                                        <div className="transition-[height] duration-500 ease-in-out">
                                            {
                                                section?.subSection.map((topic, index) => (
                                                    <div 
                                                        className={`flex gap-3 p-5 ${
                                                            videoBarActive === topic._id ? "bg-yellow-100 text-richblack-900" :
                                                            "bg-richblack-900 text-white" 
                                                        }`}
                                                        onClick={ () => {

                                                                navigate(`view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                                setvideoBarActive(topic?._id)
                                                            } 
                                                        }
                                                    >
                                                        <input 
                                                            type='checkbox'
                                                            checked={completedLectures.includes(topic?._id)}
                                                            onChange={() => {}}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    ))
                }
            </div>

        </div>

    </>
  )
}

export default VideoDetailsSidebar
