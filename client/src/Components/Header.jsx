import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className='header flex flex-col sm:flex-row bg-slate-200 p-5 justify-around items-center shadow-md'>
      <div className="header_logo flex text-[22px] font-[800]">
        <span className='text-slate-500'>Sahand</span>
        <span className='text-slate-700'>Estate</span>
      </div>
      <div className="header_searchbar">
        <form className='flex bg-slate-100 items-center px-2 mt-5 sm:px-5 sm:mt-0 rounded-lg justify-between'>
          <input type="text"  className='p-2 focus:outline-none bg-transparent'  placeholder='Search..'/>
          <FaSearch className='text-slate-600'/>
        </form>
      </div>
      <ul className='flex gap-5 font-[600]'>
        <Link to='/'>
        <li className='text-slate-700 hidden sm:inline hover:underline'>Home</li>
        </Link>
        <Link to='/about'>
        <li className='text-slate-700 hidden sm:inline hover:underline'>About</li>
        </Link>
        <Link to='/signIn'>
        <li className='text-slate-700 hidden sm:inline hover:underline'>SignIn</li>
        </Link>
      </ul>
    </div>
  )
}

export default Header