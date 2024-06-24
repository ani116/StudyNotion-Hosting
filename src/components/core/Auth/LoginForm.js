import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../services/operation/authAPI'

const LoginForm = ({formType, accountType}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({email:"" , password:"", accountType })

    console.log(formData)

    useEffect(() => {
        setFormData(prevFormData => ({
          ...prevFormData,
          accountType
        }));
      }, [accountType]);

    function changeHandler(event){
        const {name, password, value} = event.target
        setFormData(prevFormData => {
            return{
                ...prevFormData,
                [name] : [value]

            }
        }
           
        )
    }

    function submitHandler(event)
    {
        event.preventDefault()
        console.log("printing entire form", formData)

        dispatch(login(formData.email, formData.password, navigate))
        
    }



  return (
    <div>

        <form onSubmit={submitHandler} className='space-y-5 '>

            <div>
                <label className='text-richblack-5 text-sm'>Email Address <span className='text-[#EF476F]'>*</span> </label>
                <br/>
                <input 
                    type='text'
                    name='email'
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder='Enter the Email Address'
                    className='w-[508px] p-3 rounded-md bg-[#161D29] text-richblack-5'
                />
            </div>

            <div>
                <label className='text-richblack-5 text-sm'>Password <span className='text-[#EF476F]'>*</span></label>
                <br/>
                <input 
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder='Enter the Password'
                    className='w-[508px] p-3 rounded-md bg-[#161D29] text-richblack-5'
                />
            </div>

            <Link to="/forgot-password">

                <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                    Forgot Password
                </p>

            </Link>

            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
                Sign In
            </button>

        </form>
        
    </div>
  )
}

export default LoginForm
