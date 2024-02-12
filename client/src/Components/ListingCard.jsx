import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

function ListingCard({listing}) {
  return (
    <div className='w-full max-w-lg sm:max-w-[280px]    bg-white rounded-lg shadow-sm overflow-hidden' >
      <Link to={`/listing/${listing._id}`} className='flex flex-col justify-between' >
        <img src={listing.imageUrls[0]} className='h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300 '   alt="coverImg" />
        <div className="p-3 flex flex-col gap-2">
          <h1 className='text-xl font-bold truncate'>{listing.name}</h1>
          <div className="flex gap-2 items-center">
            <MdLocationOn className='text-green-800'/>
            <p className='' >{listing.address}</p>
          </div>
          <p className='text-grey-700 text-sm line-clamp-2'>{listing.description}</p>
          <p className='text-slate-700  '>
            ${listing.discountedPrice?
          listing.discountedPrice.toLocaleString('en-US'):
          listing.regularPrice.toLocaleString('en-US')} {listing.type == 'rent'?
          '/month':''}</p>
          <div className="flex gap-2">
            <div className="font-bold text-sm">
              {listing.bedrooms} {listing.bedrooms>1?'beds':'bed'}
            </div>
            <div className="font-bold text-sm">
              {listing.bathrooms} {listing.bathrooms>1?'baths':'bath'}
            </div>
          </div>
        </div>
      </Link>  
    </div>
  )
}

export default ListingCard