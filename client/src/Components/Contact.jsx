import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

function Contact({listing }) {
    const [landlord,setlandlord] = useState()
    const [error,setError] = useState(false)
    const [message,setmessage] = useState('')
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                setError(null)
                const res = await fetch(`/api/user/${listing.userRef}`)
                const data = await res.json(res)
                if(data.success == false)return setError(data.message)
                setlandlord(data)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchData()
        },[])

  return (
    <>
    {error && setcontact(false) }
    {landlord &&
    <div className="my-10 flex flex-col gap-3 font-[600] max-w-2xl">
        <p className="">Contact <span className='font-[800]' >({landlord.username})</span> for <span className='font-[800]'>{listing.name}</span> </p>
        <textarea 
        className='w-full p-3 min-h-[100px] outline-none'
        placeholder='Enter your message'
        onChange={(e)=>(setmessage(e.target.value))}
        value={message}
         >
        </textarea>
        <Link className='p-3 w-full  bg-slate-700 rounded-lg text-white text-center'
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
        >
            Send Message
        </Link>
    </div>
    }
    </>
  )
}

export default Contact