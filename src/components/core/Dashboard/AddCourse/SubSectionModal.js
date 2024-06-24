import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../../../../services/apiconnector'
import { createSubSection, updateSubSection } from '../../../../services/operation/courseDetailsAPI'
import { setCourse } from '../../../../slices/courseSlice'
import { RxCross1 } from 'react-icons/rx'
import Upload from './Upload'

const SubSectionModal = ( {modalData, setModalData, add = false, view = false, edit = false}) => {

    const  {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const dispatch = useDispatch()
    const [loading, setLoading]  = useState(false)
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)

    useEffect(() => {
        if(view || edit){
            setValue("lectureTitle", modalData?.title)
            setValue("lectureDescription", modalData?.description)
            setValue("lectureVideo", modalData?.videoUrl)
        }
    },[])

    const isFormUpDated = () => {
        const currentValues = getValues()
        if( currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDescription !== modalData.description 
            || currentValues.lectureVideo !== modalData.videoUrl
        )
        {
            return true;
        }
        else{
            return false
        }
    }

    const handleEditSubSection = async() => {
        const currentValues = getValues()
        const formData = new FormData()

        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)

        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title", currentValues.lectureTitle)
        }

        if(currentValues.lectureDescription !== modalData.description){
            formData.append("description", currentValues.lectureDescription)
        }

        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("video", currentValues.lectureVideo)
        }

        setLoading(true)

        const response = await updateSubSection(formData, token)

        if(response){
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? response : section)
            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }

        setModalData(null)
        setLoading(false)

    }

    const submitHandler = async(data) => {
        if(view){
            return ;
        }
        if(edit){

            if(!isFormUpDated()){
                toast.error("Make some Changes in the code")
            }
            else{
                handleEditSubSection()
            }
            return;
        }
        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDescription)
        formData.append("video", data.lectureVideo)
        
        console.log("video", data.lectureVideo)

        setLoading(true)

        // add Sub Section API Call
        const response = await createSubSection(formData, token)

        if(response){
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData ? response : section)
            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }

        setModalData(null)
        setLoading(false)

    }

  

  return (
    <div>
      
        <div>
            <div>
                <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                <button onClick={() => (!loading ? setModalData(null): {})}>
                    <RxCross1 />
                </button>

                <form onSubmit={handleSubmit(submitHandler)}>
                    <Upload 
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />

                    <div>
                        <label htmlFor='lectureTitle'>Lecture Title</label>
                        <input 
                            id='lectureTitle'
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", {required:true})}
                            className='text-black'
                        />
                        {
                            errors.lectureTitle && (
                                <span>Lecture Title is Required</span>
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor='lectureDescription'>Lecture Description</label>
                        <textarea 
                            id='lectureDescription'
                            placeholder='Enter Lecture Description'
                            {...register("lectureDescription", {required:true})}
                            className='w-full min-h-[130px] text-black'
                        />
                        {
                            errors.lectureDescription && (
                                <span>Lecture Description is Required</span>
                            )
                        }
                    </div>
                    {
                        !view && (
                            <button>
                                {
                                    edit ? "Save Changes" : "Save"
                                }
                            </button>
                        )
                    }
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default SubSectionModal
