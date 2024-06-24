
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import 'video-react/dist/video-react.css'; // import css
import { Player, BigPlayButton } from 'video-react';
import {AiFillPlayCircle} from "react-icons/ai"

const VideoDetails = () => {
    
    const {courseId, sectionId, subSectionId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const playRef = useRef()
    const {token} = useSelector((state) => state.auth)
    const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse)
    const [videoData, setVideoData] = useState(null)
    const [videoEnded, setVideoEnded] = useState(false)
    const [loading, setLoading] = useState(false)

    console.log("hii")

    useEffect(() => {
        const setVideoSpecificDetails = () => {
            if(!courseSectionData.length){
                return 
            }
            if(!courseId, !sectionId, !subSectionId){
                navigate("/dashboard/enrolled-courses")

            }
            else{
                // fetching which video to show in UI
                const filteredData = courseSectionData.filter((course) => course._id === sectionId)
                
                const filteredVideoData = filteredData?.[0].subSection.filter((data) => data._id === subSectionId)

                setVideoData(filteredVideoData[0])
                setVideoEnded(false)
            }
        }
        setVideoSpecificDetails()
    },[courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data) =>  data._id === sectionId)

        const currectSubSectionindex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)

        if(currentSectionIndex === 0 && currectSubSectionindex === 0){
            return true
        }
        else{
            return false
        }
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data) =>  data._id === sectionId)

        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length

        const currectSubSectionindex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)

        if(currentSectionIndex === courseSectionData.length-1 && currectSubSectionindex === noOfSubSection-1){
            return true

        }
        else{
            return false
        }

    }
    
    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data) =>  data._id === sectionId)

        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length

        const currectSubSectionindex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)

        if(currectSubSectionindex !== noOfSubSection - 1){
            // same section ki next video pe jana
            const nextSubSection = courseSectionData[currentSectionIndex].subSection[currectSubSectionindex +1]._id
            // next video pe aa jao
            navigate(`view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSection}`)
        }
        else{
            // different section ki video pe jana 
            const nextSectionId = courseSectionData[currentSectionIndex + 1]
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id
            // next video pe aa jao
            navigate(`view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }

    const goToPreviousVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data) =>  data._id === sectionId)

        const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)

        if(currentSubSectionIndex != 0){
            // same section previous video
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]
            navigate(`view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        else{
            // different section move to previous video
            const prevSectionId = courseSectionData[currentSectionIndex - 1]
            const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]
            navigate(`view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }

    const handleLectureCompletion = () => {
        // dummy code badme we will replace
        // setLoading(true)

        console.log("hii handleLectureCompletion")

        // setLoading(false)


    }

  return (
    <div className="flex flex-col gap-5 text-white">

        {
            !videoData ? (
                <div>
                    No Data found
                </div>
            ) : 
            (
                <Player
                    ref={playRef}
                    aspectRatio='16:9'
                    playsInline
                    onEnded={() => setVideoEnded(true)}
                    src={videoData?.videoUrl}

                >

                    <BigPlayButton position="center" />

                    {
                        videoEnded && (
                            <div
                                style={{
                                    backgroundImage:
                                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                                }}
                                className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                            >
                                {
                                    !completedLectures.includes(subSectionId) && (
                                        <button onClick={() => handleLectureCompletion()} className='bg-yellow-300 py-2 px-8 rounded-lg'>
                                            {
                                                !loading ? "Mark as Completed" : "Loading..."
                                            }
                                        </button>
                                    )
                                }
                                <button onClick={() => {
                                        if(playRef.current){
                                            playRef?.current.seek(0)
                                            setVideoEnded(false)
                                        }
                                    }}
                                    className='bg-yellow-300 py-2 px-8 rounded-lg'
                                >
                                    Rewatch
                                </button>
                                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                    {
                                        !isFirstVideo() && (
                                            <button onClick={goToPreviousVideo} className='blackbutton'>
                                                Prev
                                            </button>
                                        )
                                    }
                                    {
                                        !isLastVideo() && (
                                            <button onClick={goToNextVideo} className='blackbutton'>
                                                Prev
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }

                </Player>
            )
        }
        <h1>
            {videoData?.title}
        </h1>
        <p>
            {videoData?.description}
        </p>
    </div>
  )
}

export default VideoDetails
 