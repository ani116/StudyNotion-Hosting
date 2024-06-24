import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {GrAddCircle} from "react-icons/gr"
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { createSection, updateSection } from '../../../../services/operation/courseDetailsAPI'
import NestedView from './NestedView'

const CourseBuilderForm = () => {

    const {
        setValue,
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const [editSectionName, setEditSectionName] = useState(null)

    const dispatch = useDispatch()

    const cancelEdit = () => {
        setEditSectionName(null)
        setValue("sectionName", "")
    }

    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)

    const goBack = () => {
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }

    const goToNext = () => {
        if(course?.courseContent?.length === 0){
            toast.error("Please Add Atleast One Section")
            return
        }
        if(course.courseContent.some((section) => section.subSection.length === 0)){
            toast.error("Please Add Atleast One Section")
            return
        }

        // if everything is OK then => 
        dispatch(setStep(3))
    }

    const submintHandler = async(data) => {
        setLoading(true)
        let result;

        if(editSectionName){
            result = await updateSection( {sectionName: data.sectionName, sectionId: editSectionName, courseId: course._id}, token )

        }
        else{
            result  = await createSection({sectionName: data.sectionName, courseId: course._id}, token)
        }

        if(result){
            dispatch(setCourse(result))
            console.log("Cancelling edit")
            setEditSectionName(null)
            setValue("sectionName", "")
        }

        setLoading(false)
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if(editSectionName === sectionId){
            cancelEdit()
            return;
            
        }
        
        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
    }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        
        <p className="text-2xl font-semibold text-richblack-5">Course Builder Form</p>

        <form onSubmit={handleSubmit(submintHandler)} className="space-y-4">

            <div className="flex flex-col space-y-2">

                <label htmlFor='sectionName' className="text-sm text-richblack-5">
                    Section Name <sup className="text-pink-200">*</sup>
                </label>
                <input 
                    id='sectionName'
                    placeholder='Add Section Name'
                    {...register("sectionName", {required:true})}
                    className="form-style w-full"
                />
                {
                    errors.sectionName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Section Name is required
                        </span>
                    )
                }
            </div>
            <div className="flex items-end gap-x-4">
                <button type='Submit' className='flex items-center gap-2  text-yellow-300 border border-yellow-300 rounded-md py-2 px-3'>
                    {
                        editSectionName ? "Edit Section Name" : "Create Section Name"
                    }
                    <GrAddCircle />
                </button>
                {
                    editSectionName && (
                        <p onClick={cancelEdit} className="text-sm text-richblack-300 underline">Cancel Edit</p>
                    )
                }
            </div>
        </form>

        <div>
            {
                course?.courseContent?.length > 0 && (
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
                )
            }
        </div>

        <div className="flex justify-end gap-x-3">
            <button onClick={goBack} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
                Back
            </button>
            <button onClick={goToNext} className='bg-yellow-300 px-8 py-2'>
                Next
            </button>
        </div>

    </div>
  )
}

export default CourseBuilderForm
