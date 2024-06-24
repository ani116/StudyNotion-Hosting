import React, { useState } from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import frame from "../../../assets/Images/frame.png"

const Template = ({title, description, formType, image}) => {

   const [accountType, setAccountType] = useState("")

  return (
    <div className='flex justify-center gap-52 mt-20'>

        <div className='w-[508px] flex flex-col gap-5'>

            <div className='space-y-5'>
                <h1 className='text-richblack-5 text-3xl'>{title}</h1>
                <p className='text-richblack-5 text-lg '>{description}</p>
            </div>


            <div className='flex flex-row justify-between space-x-5 border border-white w-[230px] rounded-3xl p-2'>
                <button className='text-richblack-5' onClick={() => setAccountType("Student")}>Student</button>
                <button className='text-richblack-5' onClick={() => setAccountType("Instructor")}>Instructor</button>
            </div>
            
            <div>
                {
                    formType === "signup" ? (<SignupForm type={formType} accountType={accountType}/>) : (<LoginForm type={formType} accountType={accountType}/>)
                }
            </div>

            
            
        </div>

        <div>
            <div className='relative'>
                <img src={frame} alt=''/>
            </div>
            <div className='absolute translate-y-[-103%] translate-x-[-3%]'>
                <img src={image} alt=""/>
            </div>
            
        </div>
      
    </div>
  )
}

export default Template
