import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const fileRef = useRef(null)
  const [selectedimg,setselctedimg]=useState("")
  const [message,setmessage]=useState({error:null,message:''})
  const {currentuser} = useSelector((state)=> state.user)


  const uploadFile = (e)=>{
    const file = e.target.files[0]
    const allowedtypes = ['image/png','image/jpeg','image/gif']
    console.log(file.type)
    if(!allowedtypes.includes(file.type))return setmessage(()=>({error:true,message:'invalid image'}))
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload =()=>{
      setselctedimg(()=>reader.result)
    }
    setmessage({error:false,message:"Uploaded Successfully"})
  }

  return (
    <div >
      <form className='Profile flex flex-col max-w-lg m-auto mt-10'>
        <input type="file" accept='image/*'  id="profile" className='hidden'
          ref={fileRef} onChange={uploadFile}
         />

        <img src={selectedimg||currentuser.avatar}
          alt="profile" 
          className=' self-center mb-3 rounded-full max-w-[150px] '
          onClick={()=>{fileRef.current.click()}} 
        />
        {message.error? <p className='text-red-800 font-[800] self-center'>{message.message}</p> : <p className='text-green-800 font-[800] self-center'>{message.message}</p> }
      <input type="text" 
        id="Username" 
        placeholder='Username' 
        className='p-3 m-2 rounded-md outline-none'
        value={currentuser.username}
        />

      <input type="email" 
        id="email"  
        placeholder='email'
        className='p-3 m-2 rounded-md outline-none'
        value={currentuser.email}
         />

      <input type="text" 
        id="password"  
        placeholder='password'
        className='p-3 m-2 rounded-md outline-none'
         />
      <button className='p-3 m-2 rounded-md outline-none bg-red-800 text-white' >Update</button>
      </form>
    </div>
  )
}

export default Profile