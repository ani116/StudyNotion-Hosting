import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { sendOtp, signup } from '../services/operation/authAPI'

const VerifyEmail = () => {

    const [otp, setOtp] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading, signupData} = useSelector( (state) => state.auth )

    // if their is No data in signupData then render to the sign up page
    useEffect( () => {
        if(!signupData)
        {
            navigate("/signup")
        }
    }, [] )

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,

        } = signupData

        dispatch(signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
    }

  return (
    <div>
        {
            loading ? (
                        <div>
                            Loading...
                        </div>
                    ) :
                    (
                        <div className='text-white flex flex-col justify-center items-center'>
                            <h1>Verify Email</h1>
                            <p>A verification code has been sent to you. Enter the code below</p>

                            <form onSubmit={handleOnSubmit}>

                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} className='bg-richblack-600'/>}
                                />   

                                <button type='submit'>
                                    Verify Email
                                </button>
                            </form>

                            <div>
                               <div>
                                    <Link to="/login">
                                        Back To Login
                                    </Link>
                               </div>

                                {/* onClick remaining */}
                               <button onClick={() => sendOtp(signupData.email, navigate)}> 
                                    Resend It
                               </button>
                            </div>

                        </div>
                    )
        }
    </div>
  )
}

export default VerifyEmail
