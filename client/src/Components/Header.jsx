import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
function Header() {
  const currentUser = useSelector((state)=>state.user.currentuser)
  const [searchTerm ,setsearchTerm]=useState()
  const navigate = useNavigate()
  
  const handleSubmit =(e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search)
    const searchTermFromURL = urlParams.get('searchTerm')
    if(searchTermFromURL){
      setsearchTerm(searchTermFromURL)
    }
    else{
    setsearchTerm('')
    }
  },[location.search])

  return (
    <div className='header flex flex-col sm:flex-row bg-slate-200  justify-around items-center shadow-md'>
      <div className="header_logo flex text-[22px] font-[800]">
        <span className='text-slate-500'>Sahand</span>
        <span className='text-slate-700'>Estate</span>
      </div>
      <div className="header_searchbar">
        <form 
        onSubmit={handleSubmit}
        className='flex bg-slate-100 items-center px-2 mt-5 sm:px-5 sm:mt-0 rounded-lg justify-between'>
          <input type="text" 
           className='p-2 focus:outline-none bg-transparent' 
            placeholder='Search..'
            value={searchTerm}
            onChange={(e)=>{setsearchTerm(e.target.value)}}
            />
          <button>
          <FaSearch className='text-slate-600'/>
          </button>
        </form>
      </div>
      <ul className='flex gap-5 font-[600] items-center'>
        <Link to='/'>
        <li className='text-slate-700 hidden sm:inline hover:underline'>Home</li>
        </Link>
        <Link to='/about'>
        <li className='text-slate-700 hidden sm:inline hover:underline'>About</li>
        </Link>
        <Link to='/profile'>
      {currentUser?(<img src={currentUser.avatar} alt="profile" className='rounded-full h-[50px] my-3' /> ):  (<li className='text-slate-700 hidden sm:inline hover:underline'>SignIn</li>)}
      
        </Link>
      </ul>
    </div>
  )
}

export default Header