import React, { useEffect, useState} from 'react'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsCart } from "react-icons/bs";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
// import { categories } from '../../services/apis'
import { MdArrowDropDownCircle } from "react-icons/md";
import { logout } from '../../services/operation/authAPI'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { fetchCourseCategories } from '../../services/operation/courseDetailsAPI'
import dummy from "../../assets/Images/dummyProfileImage.png"



// const subLink = [
//     {
//         title: "Python",
//         link: "/catalog/python"
//     },
//     {
//         title: "Web Development",
//         link: "/catalog/web-dev"
//     }
// ]



const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [subLinks, setSubLinks] = useState([])

    function clickHandler(){
        dispatch( logout(navigate) )
    }

    const {token} = useSelector((state) => state.auth)
    useEffect(() => {
        ;(async () => {
          setLoading(true)
          try {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
            setSubLinks(res?.data?.data || [])
            console.log("the categories resposes is",res)
          } catch (error) {
            console.log("Could not fetch Categories.", error)
          }
          setLoading(false)
        })()
      }, [])
      console.log("sub Links", subLinks)
    

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

            <Link to="/">
                <img src={Logo} alt='' width={160} height={42}/>
            </Link>

            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                     {
                        NavbarLinks.map((elements, index) => {
                            return <li key={index}>
                                {
                                    // Drop Down Menu
                                    elements.title === "Catalog" ? (
                                        <div className='flex gap-1 items-center group relative'>

                                            <p>
                                                {elements.title}
                                            </p>
                                            <MdArrowDropDownCircle />

                                            <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>

                                                <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-y-[-10%] translate-x-[80%]'>
                                                </div>
                                                
                                                {loading ? (
                                                    <p className="text-center">Loading...</p>
                                                ) : subLinks.length ? (
                                                    <>
                                                        
                                                        {subLinks.map((subLink, i) => (
                                                                <Link
                                                                    to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} // Create link for each subLink
                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                    key={i}
                                                                >
                                                                    <p className='text-black'>{subLink.name}</p> 
                                                                </Link>
                                                        ))}
                                                        
                                                    </>
                                                ) : (
                                                    <p className="text-center">No Courses Found</p>
                                                )}

                                            </div>

                                        </div>
                                    ) : (
                                        <Link to={elements?.path}>
                                            <p className={`${matchRoute(elements?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {elements.title}
                                            </p>
                                        </Link>
                                     )
                                }
                            </li>
                        })
                     }
                </ul>
            </nav>

            {/* login/signup/dashboard */}
            <div className='flex gap-x-4 items-center'>

                     {/* {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>

                                <BsCart />

                                {
                                    totalItem > 0 && (
                                        <span>{totalItem}</span>
                                    )
                                }

                            </Link>
                        )
                     } */}

                    {
                        token && (
                            <div>
                                <img 
                                    src={dummy}
                                    alt="dummy"
                                    className='h-[20px]'
                                    onClick={() => navigate("/dashboard/my-profile")}
                                />
                            </div>
                        )
                    }

                     {
                        token === null && (
                            <Link to="/login" className={`${matchRoute("/login") ? "text-yellow-25" : "text-white" }`}>
                                <button>
                                    Log In
                                </button>
                            </Link>
                        )
                     } 
                     {
                        token !== null && (
                            <button onClick={clickHandler} className='text-richblack-5'>
                                Log Out
                            </button>
                        )
                     }

                     {
                        token === null && (
                            <Link to="/signup" className={`${matchRoute("/signup") ? "text-yellow-25" : "text-white" }`}>
                                <button>
                                    Sign Up
                                </button>
                            </Link>

                        )
                     }

                     {
                        token !== null && <ProfileDropDown/>
                     }

            </div>

        </div>

    </div>
  )
}

export default Navbar
