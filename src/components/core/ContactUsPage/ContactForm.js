import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../services/apiconnector";
import { contactUsEndPoint } from "../../../services/apis";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const ContactForm = () => {

    const [loading, setLoading] = useState(false)

  const {CONTACTUS_API} = contactUsEndPoint

  const {
          register,
          reset,
          handleSubmit,
          formState: {errors, isSubmitSuccessful}
  } = useForm()

  const submitContactForm = async(data) => {
        const toastId = toast.loading("Loading")
      console.log("Fetching DAta", data)
      setLoading(false)
      try {
        const response = await apiConnector("POST", CONTACTUS_API, data)
        console.log("Response is", response)

      } 
      catch (error) {
        console.log("Error message", error)
        setLoading(false)
      }
      toast.dismiss(toastId)
      toast.success("Message Sent Successfully")
  }

  useEffect( () => {
      if(isSubmitSuccessful){
        reset({
          firstName:"",
          lastName:"",
          email:"",
          phone:"",
          message:"",
          
        })
      }
  }, [reset, isSubmitSuccessful] )

  


  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>

      <div className="mt-7">
      <form onSubmit={handleSubmit(submitContactForm)} className='space-y-3 mt-12'>

        <div className='flex gap-5 text-white'>
        <div className='flex flex-col gap-[6px]'>
            <label>First Name</label>
            
            <input 
                type='text'
                id='firstName'
                name='firstName'
                {...register("firstName", {required:true})}
                
                placeholder='Enter the First Name'
                className="form-style w-[290px]"
            />
            {
            errors.firstName && (
                <span>
                please Enter the First Name
                </span>
            )
            }
        </div>
        
        <div className='flex flex-col gap-[6px]'>
            <label>Last Name</label>
            <input 
                    type='text'
                    name='lastName'
                    id='lastName'
                    {...register("lastName")}                         
                    placeholder='Enter the Last Name'
                    className="form-style w-[290px]"
            />
        </div>
        
        </div>
        <div className='flex flex-col gap-[6px]'>
        <label htmlFor='email' className='text-white'>Email Address</label>
        <input 
                type='email'
                name='email'
                id='submit'
                {...register("email", {required:true})}
                placeholder='Enter the Email'
                className="form-style"
            />
            {
            errors.email && (
                <span>
                please fill the email correctly
                </span>
            )
            }
        </div>

        <div className='flex flex-col gap-[6px]'>
        <label htmlFor='' className='text-white'>Phone Number</label>
        <input 
                type='text'
                name='phone'
                id='phone'
                {...register("phone", {required:true})} 
                placeholder='Enter the Phone Number'
                className="form-style"
            />
        </div>

        <div className='flex flex-col gap-[6px]'>
        <label htmlFor='message' className='text-white'>Message</label>
        <textarea 
            id="message" 
            name="message" 
            {...register("message", 
            {required:true})} 
            placeholder='Enter The Message' 
            rows="7" cols="30" 
            className="form-style"
        />
        {
            errors.message && (
            <span>
                please Enter The Message
            </span>
            )
        }
        </div>

        <button type='submit' className='rounded-md bg-yellow-50 text-center px-8 py-2 text-[16px] font-bold text-black w-full'>
            Send Message
        </button>

    </form>
      </div>
    </div>
  );
};

export default ContactForm;
