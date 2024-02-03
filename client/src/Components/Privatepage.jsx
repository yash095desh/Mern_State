import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
function Privatepage() {
    const {currentuser} = useSelector((state)=>state.user)
  return currentuser?<Outlet/>:<Navigate to={'/signIn'}/>
  
}

export default Privatepage