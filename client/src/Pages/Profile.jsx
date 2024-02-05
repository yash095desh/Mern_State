import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateStart,updateFailure,updateSuccess } from '../redux/user/UserSlice'

function Profile() {
  const fileRef = useRef(null)
  const [formData , setformData] =useState({})
  const [message,setmessage]=useState({error:null,message:''})
  const {currentuser,loading,error} = useSelector((state)=> state.user)
  const dispatch = useDispatch()


  const uploadFile = (e)=>{
    const file = e.target.files[0]
    const allowedtypes = ['image/png','image/jpeg','image/gif']
    if(!allowedtypes.includes(file.type))return setmessage(()=>({error:true,message:'invalid image'}))
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload =()=>{
      setformData((prev)=>({...prev,avatar:reader.result}))
    }
    setmessage({error:false,message:"Uploaded Successfully"})

  }

  const handleChange = (e)=>{
    setformData((prev)=>({...prev,[e.target.id]: e.target.value}))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(formData)
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentuser._id}`,{
        method : "POST",
        headers : {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData)
      })
       const data = await res.json()
       if(data.success == false ) return dispatch(updateFailure(data.message))
       console.log(data)
      dispatch(updateSuccess(data))
    } catch (error) {
      console.log(error)
      dispatch(updateFailure(error))
    }
  }

  return (
    <div >
      <form className='Profile flex flex-col max-w-lg m-auto mt-10' onSubmit={handleSubmit} >
        <input type="file" accept='image/*'  id="profile" className='hidden'
          ref={fileRef} onChange={uploadFile}
         />

        <img src={formData.avatar||currentuser.avatar}
          alt="profile" 
          className=' self-center mb-3 rounded-full max-w-[150px] '
          onClick={()=>{fileRef.current.click()}} 
        />
        {message.error? <p className='text-red-800 font-[800] self-center'>{message.message}</p> : <p className='text-green-800 font-[800] self-center'>{message.message}</p> }
      <input type="text" 
        id="username" 
        placeholder='Username' 
        className='p-3 m-2 rounded-md outline-none'
        defaultValue={currentuser.username}
        onChange={handleChange}
        />

      <input type="email" 
        id="email"  
        placeholder='email'
        className='p-3 m-2 rounded-md outline-none'
        defaultValue={currentuser.email}
        onChange={handleChange}
         />

      <input type="text" 
        id="password"  
        placeholder='password'
        className='p-3 m-2 rounded-md outline-none'
        onChange={handleChange}
         />
      <button className='p-3 m-2 rounded-md outline-none bg-red-800 text-white'>{loading?'...Loading':'Update'}</button>
      {error? <p>{error}</p> : <p>Updated Successfully</p> }
      </form>
    </div>
  )
}

export default Profile