
import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/UserSlice';
import OAuth from '../Components/OAuth';


function SignIn() {


  const [formData,setformData] = useState({username:'',email:'',password:''});
  const {loading,error} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e)=>{
    setformData((prev)=>({...prev,[e.target.id]:e.target.value}))
  }



  const handleSubmit = async(e)=>{
        e.preventDefault()
       try {
          dispatch(signInStart())
          const res = await fetch('https://mern-estate-sy31.onrender.com/api/auth/signIn',{
          method : 'POST',
          headers : {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
         })
        const data = await res.json()
        if(data.success == false){
          dispatch(signInFailure(data.message))
        }else{
          navigate('/')
          dispatch(signInSuccess(data))
        }
       }
        catch (error) {
        dispatch(signInFailure(error.message))
       }
  }


  return (
    <div className='signIn mx-auto max-w-md '>
      <h1 className=' text-4xl text-center mt-10 text-slate-700 font-[800]'>SignIn</h1>
      <form className='flex flex-col p-5 gap-5' onSubmit={handleSubmit} >
        <input type="text"
         required={true} 
         id="username" 
         value={formData.username}
         autoComplete='off'
         className='p-3 rounded-lg outline-none'
          placeholder='username'
          onChange={handleChange}
          />
        <input type="input"
         required={true}
         id="password" 
         value={formData.password}
         autoComplete='off'
         className='p-3 
         rounded-lg  
         outline-none'
          placeholder='password'
          onChange={handleChange}
          />
        <button 
        type='submit'
         className='p-3 bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-90'
         disabled = {loading}
          >{loading?'Loading...':'SignIn'}</button>
      <OAuth/>
      </form>
     <div className='flex p-5 '>
      <p>Dont Have an account?</p>
      <Link to={'/signUp'}>
        <span className='text-slate-500 font-[800]'>SignUp</span>
      </Link>
     </div>
     {error && <p className='text-red-800 font-[600]'>{error}</p>}
    </div>
  )
}

export default SignIn