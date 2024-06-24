import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../services/operation/courseDetailsAPI'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import RequirementField from './RequirementField'
import { setCourse, setStep } from '../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import CourseBuilderForm from './CourseBuilderForm'
import Upload from './Upload'

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}

    } = useForm()

    const dispatch = useDispatch()
    const {course, editCourse, step} = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])
    const {token} = useSelector((state) => state.auth)

    useEffect(() => {
        const getCatogries = async() => {
            setLoading(true)
            const categories = await fetchCourseCategories()
            
            if(categories && categories.length > 0){
                setCourseCategories(categories)
            }
            setLoading(false)
            console.log("The Response of catogeries is", categories)
        }

        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)


        }
       
        getCatogries()
    }, [])

    function isFormUpDated(){
        const currentValues = getValues()
        if(
             // this means if they are not equal then data is updated
            currentValues.courseTitle !== course.courseName ||   
            currentValues.courseShortDesc !== course.courseDescription || 
            currentValues.coursePrice !== course.price || 
            // currentValues.courseTags !== course.tag ||
            currentValues.courseTitle !== course.courseName || 
            currentValues.courseBenefits !== course.whatYouWillLearn ||  
            currentValues.courseCategories._id !== course.category._id || 
            currentValues.image !== course.thumbnail || 
            currentValues.courseTitle !== course.courseName || 
            currentValues.courseRequirements.toString() !== course.instructions.toString() 

        ) 
            return true

        else
            return false
    }

    const submitHandler = async(data) => {
        if(editCourse){
            if(isFormUpDated()){
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id)

                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle)
                }

                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseShortDesc)
                }

                if(currentValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice)
                }

                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }

                if(currentValues.courseCategories._id !== course.category._id){
                    formData.append("category", data.courseCategories)
                }

                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instruction", JSON.stringify(data.courseRequirements) )
                }

                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }

                setLoading(true)
                const response = await editCourseDetails(data, token)
                if(response){
                    setStep(2);
                    setCourse(response)
                }
                console.log("Printing form Data", formData)
                console.log("printting the response", response)
            }
            else{
                toast.error("No Changes made in Form")
            }
            return
        }
        
        // creating the new Course
        const formData = new FormData()
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("thumbnailImage", data.courseImage)
        // formData.append("status", COURSE_STATUS.DRAFT);

        console.log("Before")
        setLoading(true)
        const response = await addCourseDetails(formData, token)
        console.log("After")
        if(response){
            console.log("Dispatching to step 2")
            dispatch(setStep(2)) 
            dispatch(setCourse(response))
            
        }
        console.log("Current step is", step)
        
        console.log("Printing form Data", formData)
        console.log("printting the response", response)
    }

  return (
    <div>
      
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

            <div className="flex flex-col space-y-2">
                <label htmlFor='courseTitle' className="text-sm text-richblack-5">Course Title</label>
                <input  
                    id='courseTitle'
                    placeholder='Enter Course Title'
                    {...register("courseTitle", {required:true})}
                    className="form-style w-full"
                />
                {
                    errors.couseTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Title Required</span>
                    )
                }
            </div>
            {/* Course Description */}
            <div className="flex flex-col space-y-2">
            <label  htmlFor='courseShortDesc' className="text-sm text-richblack-5">Course Short Description</label>
            <textarea
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required:true})}
                className="form-style resize-x-none min-h-[130px] w-full"
                />
            {
                errors.courseShortDesc && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                    Course Description is required**
                </span>)
            }
        </div>

        <div className="flex flex-col space-y-2" >
            <label htmlFor='coursePrice' className="text-sm text-richblack-5">Course Price</label>
            <input
                id='coursePrice'
                placeholder='Enter Course Price'
                {...register("coursePrice", {
                    required:true,
                    valueAsNumber:true
                })}
                className="form-style w-full !pl-12"
            />
            <HiOutlineCurrencyRupee  className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400"/>
            {
                errors.coursePrice && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Course Price is Required**</span>
                )
            }
        </div>

        <div className="flex flex-col space-y-2">
            <label htmlFor='courseCategory' className="text-sm text-richblack-5">Course Category<sup>*</sup></label>
            <select
            id='courseCategory'
           
            {...register("courseCategory", {required:true})}
            className="form-style w-full"
            >
                <option value="" disabled>Choose a Category</option>

                {
                    !loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id} className='text-black'>
                            {category?.name}
                        </option>
                    ))
                }

            </select>
            {errors.courseCategory && (
                <span>
                    Course Category is Required
                </span>
            )}
        </div>

        {/* create a custom component for handling tags input */}
        {/* <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues = {getValues}
        /> */}

        {/* create a component for uploading and showing preview of media */}
        <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
        
        {/*     Benefits of the Course */}
        <div className="flex flex-col space-y-2">
            <label htmlFor='courseBenefits' className="text-sm text-richblack-5">Benefits of the course</label>
            <textarea
            id='courseBenefits'
            placeholder='Enter Benefits of the course'
            {...register("courseBenefits", {required:true})}
            className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.courseBenefits && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Benefits of the course are required**
                </span>
            )}
        </div>

        <RequirementField 
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}    
        />

        <div>

            {
                editCourse && (
                    <button onClick={ () => dispatch(setStep(2)) } className='flex items-center gap-x-2 bg-richblack-300'>

                        Continue without saving
                    </button>
                )
            }

            <button type='submit' className='bg-yellow-50 py-2 px-8 font-medium text-black rounded-md'>
                {
                    !editCourse ? "Next" : "Save Changes"
                }
            </button>

        </div>

        </form>

    </div>
  )
}

export default CourseInformationForm
