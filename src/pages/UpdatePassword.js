import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getresetPassword } from '../services/operation/authAPI'

const UpdatePassword = () => {

    const {loading} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()

    const [formData, setFormData] = useState(
        {
            password:"",
            confirmPassword:""
        }
    )

    const {password, confirmPassword} = formData

    const handleOnchange = (e) => {
        setFormData( (prevData) => (
            {
                ...prevData,
                [e.target.name] : [e.target.value]
            }
        ) )
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1)  // this token is sent when you performed getPasswordResetToken
        dispatch(getresetPassword(password, confirmPassword, token))
    }

  return (
    <div>
        {
            loading ? (
                        <div>
                            Loading...
                        </div>
        ) : (
                <div>
                    <h1>Choose New Password</h1>
                    <p>Almost done. Enter your new password and youre all set</p>
                    <form onSubmit={handleOnSubmit}>
                        <label>
                            <p>New Password *</p>
                            <input
                                required
                                type='password'
                                name='password'
                                value={password}
                                onChange={handleOnchange}
                                placeholder='Enter The Password'
                            />
                        </label>

                        <label>
                            <p>Confirm New Password *</p>
                            <input
                                required
                                type='password'
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleOnchange}
                                placeholder='Confirm New Password'
                            />
                        </label>

                        <button type='submit'>
                            Reset Password
                        </button>
                    </form>
                    <div>
                        <Link to="/login">
                            Back to LogIn
                        </Link>
                    </div>
                </div>
        )
        }
    </div>
  )
}

export default UpdatePassword
