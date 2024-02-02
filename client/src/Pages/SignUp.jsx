import { data } from 'autoprefixer';
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function SignUp() {


  const [formData,setformData] = useState({username:'',email:'',password:''});
  const [loading,setloading] = useState(false);
  const [message,setmessage]=useState({success:null,message:''})



  const handleChange = (e)=>{
    setformData((prev)=>({...prev,[e.target.id]:e.target.value}))
  }



  const handleSubmit = async(e)=>{
        e.preventDefault()
       try {
          setloading(true)
          setmessage({success:null,message:''})
          const res = await fetch('/api/auth/signUp',{
          method : 'POST',
          headers : {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
         })
        const data = await res.json()
        if(data.success == false){
          setmessage({success:null,message:''})
        }
        setmessage(data)
        setloading(false)
       }

        catch (error) {
        setloading(false)
        setmessage({success:false,message:error.message})
       }
       setformData({username:'',email:'',password:''})
  }


  return (
    <div className='signUp mx-auto max-w-md '>
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
        <input type="email" 
         required={true}
        id="email"
        value={formData.email}
        autoComplete='off'
        className='p-3 rounded-lg  outline-none' 
         placeholder='email'
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
          >{loading?'Loading...':'SignUp'}</button>
      </form>
     <div className='flex p-5 '>
      <p>Already Have an account?</p>
      <Link to={'/signIn'}>
        <span className='text-slate-500 font-[800]'>SignIn</span>
      </Link>
     </div>
     {message.success == true? <p className='text-green-800 font-[600]'>{message.message}</p> :<p className='text-red-800 font-[600]'>{message.message}</p>}
     {/* {data&& <p className='text-green-800 font-[600]'>{data}</p> } */}
    </div>
  )
}

export default SignUp