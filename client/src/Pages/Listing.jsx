import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from "react-icons/fa";
import { useSelector } from "react-redux";
import User from "../../../server/modals/userModal";
import Contact from "../Components/Contact";

function Listing() {
  SwiperCore.use([Navigation]);
  const Params = useParams();
  const [listing, setlisting] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const {currentuser} = useSelector((state)=> state.user)
  const [contact ,setcontact] = useState(false)
  const [copied,setcopied] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const fetchId = Params.id;
        const res = await fetch(`/api/listing/getlisting/${fetchId}`);
        const data = await res.json();
        if (!data.success) {
          setError(data.message);
        }
        setlisting(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading && <p className="text-center p-5 font-[800]">Loading..</p>}
      {error && <div>{error}</div>}
      {listing && !error && !loading && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[350px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="bg-slate-100 flex text-slate-500 fixed top-[13%] right-[10%] cursor-pointer justify-center w-12 h-12 rounded-full z-10 items-center ">
            <FaShare
            onClick={()=>{
                navigator.clipboard.writeText(window.location.href)
                setcopied(true)
                setTimeout(()=>(setcopied(false)),2000)
            }}
            />
            {copied && 
            <p className="text-slate-700 font-[800] fixed top-[22%] right-[8%] z-10 " >link Copied </p> }
          </div>
         <div className="mx-10">
         <h1 className="text-xl  sm:text-3xl  font-[800] my-10">
            {listing.name} - ${listing.regularPrice}
            {listing.type == "rent" ? "/month" : ""}{" "}
          </h1>
          <div className="flex gap-4">
            <FaMapMarkerAlt className="text-green-700 text-[18px]" />
            <p className="font-[600]">{listing.address}</p>
          </div>
         <div className="flex flex-col sm:flex-row sm:gap-6 ">
         <button className="bg-red-800 p-3 text-white rounded-lg my-4 w-full max-w-[200px]">
            {listing.type == 'rent'?"For Rent":"For Sale"}
          </button>
          {listing.discountedPrice>0 &&
          <button className="bg-green-800 p-3 text-white rounded-lg my-4 w-full max-w-[200px]">
            ${listing.regularPrice - listing.discountedPrice} discount
          </button>
          }
         </div>
          <p className="my-4 font-[600] ">
            <span className="font-[800] text-[18px]" >Description - </span>
                  {listing.description}
          </p>
          <div className="flex gap-4 my-5 flex-wrap">
            <p className="flex gap-2 items-center text-green-700  font-[800]">
                <FaBed/> {listing.bedrooms} {listing.bedrooms>1?"beds":"bed"} 
            </p>
            <p className="flex gap-2 items-center text-green-700  font-[800]">
                <FaBath/> {listing.bathrooms} {listing.bathrooms>1?"baths":"bath"} 
            </p>
            <p className="flex gap-2 items-center text-green-700  font-[800]">
                <FaParking/>  {listing.parking?"With Parking":"No Parking"} 
            </p>
            <p className="flex gap-2 items-center text-green-700  font-[800]">
                <FaChair/>  {listing.furnished?"Fully Furnished":"UnFurnished"} 
            </p>
          </div>
          {currentuser && currentuser._id !== listing.userRef && !contact &&
            <button 
            className="text-white w-full max-w-[400px] bg-slate-700 p-3 rounded-lg my-5"
            onClick={()=>setcontact(true)}
            >
            Contact landlord
          </button>
          }
          {contact &&  <Contact listing={listing} />  }
         </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
