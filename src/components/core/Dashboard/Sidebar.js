import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLinks from './SidebarLinks'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operation/authAPI'
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    const {loading: authLoading} = useSelector((state) => state.auth)
    const {user, loading: profileLoading} = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmationModal, setConfirmationModal] = useState(null)
    if(user === null){
        console.log("user is Null", user);
    }

  return (
    <div className=''>

        <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>

            <div>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null
                        return (
                            <SidebarLinks key={link.id} link={link} iconName={link.icon}/>
                        )
                    })
                }
            </div>

            <div className='mx-auto mb-6 mt-6 h-[1px] w-10/11 bg-richblack-600 border border-black'></div>
            <div className='flex flex-col gap-4'>

                {/* <SidebarLinks 
                    link={{name:"Setting", path:"dashboard/setting"}} 
                    iconName="VscSettingGear"
                /> */}
                <NavLink to="dashboard/setting" className=''> 

                    <div className='relative px-8 py-2 text-sm font-md flex flex-row gap-1 border-[1px] border-richblack-5'>

                        <VscSettingsGear className='text-lg'/>
                        <span>Setting</span>

                    </div>

                </NavLink>

                {/* log out logic  */}
                <button
                    onClick={ () => { setConfirmationModal({
                        text1:"Are you Sure?",
                        text2:"You will be logged out from your account",
                        btn1Text:"Logout",
                        btn2Text:"Cancel",
                        btn1Handler: () => {dispatch(logout(navigate))},
                        btn2Handler: () => {setConfirmationModal(null)},
                    })
                    } }
                    className='text-sm font-medium text-richblack-300'
                >
                    
                    <div className='flex items-center gap-x-2 px-8 py-2'>
                        <VscSignOut className='text-lg'/>
                        <span>Logout</span>
                    </div>

                </button>    
                            
            </div>

        </div>
      
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}

    </div>
  )
}

export default Sidebar
