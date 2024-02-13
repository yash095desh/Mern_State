import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper ,SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import ListingCard from '../Components/ListingCard'

function Home() {
  const [offerlisting,setofferlisting] = useState([])
  const [saleslisting,setSaleslisting] = useState([])
  const [rentlisting,setrentlisting] = useState([])
  SwiperCore.use([Navigation])

  useEffect(()=>{
    const fetchoffer =async()=>{
      try {
      const res = await fetch(`https://mern-estate-sy31.onrender.com/api/listing/get?limit=4&offer=true`)
      const data = await res.json()
      console.log(data)
      setofferlisting(data)
      fetchrent()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchrent = async()=>{
      try {
        const res = await fetch ('https://mern-estate-sy31.onrender.com/api/listing/get?type=rent&limit=4')
      const data = await res.json()
      console.log(data)
      setrentlisting(data)
      fetchsale()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchsale =async()=>{
      try {
        const res = await fetch ('https://mern-estate-sy31.onrender.com/api/listing/get?type=sale&limit=4')
        const data = await res.json()
        console.log(data)
        setSaleslisting(data)
      } catch (error) {
        console.log(data)
      }
    }
    
    fetchoffer();
  },[])

  return (
    <div>
      {/* top*/}
      <div className=' p-5 md:p-28 max-w-6xl flex flex-col gap-6'>
        <h1 className="text-4xl md:text-5xl  text-slate-800 font-bold">Find your next <span className='text-slate-500'>perfect</span> <br /> place with ease</h1>
        <p className='font-semibold text-gray-500'>Sahand Estate is perfect place to find your next perfect place to live . <br />
        We have a wide range of properties for you to choose from.
        </p>
        <Link to={`/search`} className='text-blue-700 font-bold text-md'>
        Let's get started... 
        </Link>
      </div>


      {/*Slider */}
      <Swiper navigation>
        {offerlisting && offerlisting.length>0 &&
        offerlisting.map((listing)=>{
          return <SwiperSlide>
          <div key={listing.id} 
          style={{
            background :`url(${listing.imageUrls[0]}) center no-repeat`,
            backgroundSize:'cover'
            }} 
          className='h-[500px] my-10'
          ></div>
          </SwiperSlide>
        })
        }

      </Swiper>



      {/*bottom */}
      <div className=" p-3 mx-auto max-w-7xl flex flex-col gap-10 my-20">
      <div className='flex flex-col'>
        {offerlisting && offerlisting.length>0 &&
        <div>
          <div className="text-slate-600 font-bold text-2xl py-5 ">Recent offer</div>
        <div className="flex flex-wrap gap-4">
          {offerlisting.map((listing)=>{
            return <ListingCard key={listing._id} listing={listing}/>
          })}
        </div>
        </div>
        }
        </div>

        <div className='flex flex-col'>
        {rentlisting && rentlisting.length>0 &&
        <div>
          <div className="text-slate-600 font-bold text-2xl py-5">For Rent</div>
        <div className="flex flex-wrap gap-4">
          {rentlisting.map((listing)=>{
            return <ListingCard key={listing._id} listing={listing}/>
          })}
        </div>
        </div>
        }
        </div>

        <div className='flex flex-col'>
        {saleslisting && saleslisting.length>0 &&
        <div>
          <div className="text-slate-600 font-bold text-2xl py-5">For Sale</div>
        <div className="flex flex-wrap gap-4">
          {saleslisting.map((listing)=>{
            return <ListingCard key={listing._id} listing={listing}/>
          })}
        </div>
        </div>
        }
        </div>
      </div>
    </div>
  )
}

export default Home