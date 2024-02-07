import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import 
{ updateStart,
  updateFailure,
  updateSuccess ,
deleteStart,
deleteFailure,
deleteSuccess} from '../redux/user/UserSlice'

function Profile() {
  const fileRef = useRef(null)
  const [formData , setformData] =useState({})
  const [message,setmessage]=useState({error:null,message:''})
  const [listings,setlistings] = useState([])
  const [listingShown,setlistingShown] = useState(false)
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
      const data = reader.result
      console.log(data)
    }
    setmessage({error:false,message:"Uploaded Successfully"})
  }

  const handleChange = (e)=>{
    setformData((prev)=>({...prev,[e.target.id]: e.target.value}))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
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
      dispatch(updateSuccess(data))
    } catch (error) {
      console.log(error)
      dispatch(updateFailure(error))
    }
  }

  const deleteUser = async(e)=>{
      try {
        dispatch(deleteStart())
        const res = await fetch(`/api/user/delete/${currentuser._id}`,{
          method : "DELETE",
        })
        const data = await res.json()
        console.log(data)
        if(data.success == false)return dispatch(deleteFailure(data.message))
        dispatch(deleteSuccess())
      } catch (error) {
        dispatch(deleteFailure(error.message))
      }
  }
  const signOutUser = async(e)=>{
    try {
      dispatch(deleteStart())
      const res = await fetch(`/api/user/signOut/${currentuser._id}`)
      const data = await res.json()
      console.log(data)
      if(data.success == false)return dispatch(deleteFailure(data.message))
      dispatch(deleteSuccess())
    } catch (error) {
      dispatch(deleteFailure(error))
    }
  }
  const showListing = async(e)=>{
    try {
      const res = await fetch(`/api/user/listing/${currentuser._id}`)
      const data = await res.json()
      console.log(data)
      setlistings(data)
      setlistingShown((prev)=>!prev)
      console.log(listingShown)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div >
      <form className='Profile flex flex-col max-w-lg m-auto my-10 px-2' onSubmit={handleSubmit} >
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
        className='p-3 my-2 rounded-md outline-none'
        defaultValue={currentuser.username}
        onChange={handleChange}
        />

      <input type="email" 
        id="email"  
        placeholder='email'
        className='p-3 my-2 rounded-md outline-none'
        defaultValue={currentuser.email}
        onChange={handleChange}
         />

      <input type="text" 
        id="password"  
        placeholder='password'
        className='p-3 my-2 rounded-md outline-none'
        onChange={handleChange}
         />
      <button className='p-3 my-2 rounded-md outline-none bg-slate-800 text-white hover:opacity-90'>{loading?'...Loading':'Update'}</button>
      <Link className='bg-green-800 p-3 text-white rounded-md my-2 text-center hover:opacity-90'
        to={'/createListing'}
      >
      Create Listing
      </Link>
      <div className='flex justify-between text-red-600 font-[800]  my-3 ' >

        <span className='cursor-pointer'
          onClick={deleteUser}
        >
          DeleteUser
        </span> 
        <span 
        className='cursor-pointer'
        onClick={signOutUser}
        >
          SignOut
        </span> 

        </div>
      
      {error && <p className='text-red-600 font-[600]'>{error}</p> } 
      {error == false &&<p className='text-green-600 font-[600]'>Updated Successfully</p> }
      <p 
      className='  text-green-600 hover:opacity-90 mx-auto font-[800] cursor-pointer mt-5'
      onClick={showListing}
      >  {listingShown?'Hide Listing':'Show Listing'}</p>

      </form>
      {listingShown && 
      listings.map((listing)=>{
        return (
          <div
           className='flex flex-col sm:flex-row justify-between p-3 border-2 m-2 items-center max-w-3xl mx-auto rounded-xl flex-1' 
          key={listing._id} id='listing'>
            <div className="flex items-center gap-4">
            <img src={listing.imageUrls[0]} alt="listingImg" className='w-20 h-20 object-contain' />
            <div className=" truncate font-[600]">
              {listing.name}
            </div>
            </div>
            <div className="flex gap-4 font-[600]">
              <span className='text-green-800 cursor-pointer'>Edit</span>
              <span className='text-red-800 cursor-pointer'>Delete</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Profile