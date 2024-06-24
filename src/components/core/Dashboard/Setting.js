import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../services/operation/profileAPI'

const Setting = () => {
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        gender: "",
        contactNumber: "",
        dateOfBirth: "",
        about: "",
        
      })

    console.log(formData)

    function changeHandler(event){
       const {name, value} = event.target
        setFormData( (prevformData) => {
            return{
                ...prevformData,
                [name] : value
            }
        })
    }
    const settingData = {
        ...formData
    } 
    function submitHandler(e){
        e.preventDefault();
        console.log("updated date", formData)
        dispatch(updateProfile(settingData, token))
    }

  return (
    <div>
        
        <div>
            <form onSubmit={submitHandler}>
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Profile Information
                    </h2>

                    <div className="flex flex-col gap-5 lg:flex-row items-center">
                        <label className="lable-style" >Name</label>
                        
                        <p className="form-style">{user?.firstName}  {user?.lastName}</p>
                    </div>

                </div> 

                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h1 className='text-white'>Edit Profile</h1>
                    <div className='flex gap-4 justify-between'>

                        <div>
                            <label className='text-white'>Date of Birth</label>
                            <br/>
                            <input 
                                type='text'
                                name='dateOfBirth'
                                value={formData.dateOfBirth}
                                onChange={changeHandler}
                                className="form-style w-[400px]"

                            />
                        </div>
                        <div>
                            <label className='text-white'>Gender</label>
                            <div className='flex flew-row'>
                                <input 
                                    type='text'
                                    name='gender'
                                    value={formData.gender}
                                    onChange={changeHandler}
                                    className="form-style w-[400px]"
                                />
                            </div>
                        </div> 
                    
                    </div>

                    <div className='flex gap-4'>
                        
                        <div>
                        <label className='text-white'>Phone Number</label>
                        <input 
                                type='text'
                                name='contactNumber'
                                value={formData.contactNumber}
                                onChange={changeHandler}
                                className="form-style w-[400px]"
                            />
                        </div>

                        <div>
                            <label className='text-white'>About</label>
                            <input 
                                type='text'
                                name='about'
                                value={formData.about}
                                onChange={changeHandler}
                                className="form-style w-[400px]"
                            />
                        </div>

                    </div>
                </div>
                
                <button type='submit' className='bg-yellow-300 text-richblack-700 py-2 px-8 rounded-lg'>
                    Save
                </button>
            </form>
        </div>
    </div>
  )
}

export default Setting
