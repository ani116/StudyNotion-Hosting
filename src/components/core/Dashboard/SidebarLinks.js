import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux'
import { NavLink, matchPath, useLocation } from 'react-router-dom'

const SidebarLinks = ({link, iconName}) => {

    const Icon = Icons[iconName]
    const location = useLocation()
    const dispatch = useDispatch()

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

    if (!Icon) {
        console.error(`Icon ${iconName} is not found in react-icons/vsc`);
        return null;
      }

  return (
    <NavLink 
        to={link.path}
        className="px-8 py-2 text-sm font-md"
    >


        <div className = { `relative px-8 py-2 text-sm font-md flex flex-row border gap-1 border-white ${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}` }>
            <Icon className="text-lg" />
            <span>{link.name}</span>
        </div>

    </NavLink>
  )
}

export default SidebarLinks
