import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../Components/ListingCard";

function Search() {
  const [sidebarData, setsidebarData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    order: "desc",
    sort: "createdAt",
  });
  const [listing, setlisting] = useState([]);
  const navigate = useNavigate();
  const [loading,setloading] = useState(false)
  const [showMore,setshowMore] = useState(false)

  const handleChange = (e) => {
    if (e.target.id == "searchTerm") {
      setsidebarData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
    if (
      e.target.id == "all" ||
      e.target.id == "rent" ||
      e.target.id == "sale"
    ) {
      setsidebarData((prev) => ({ ...prev, type: e.target.id }));
    }
    if (
      e.target.id === "offer" ||
      e.target.id === "parking" ||
      e.target.id === "furnished"
    ) {
      setsidebarData((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setsidebarData((prev) => ({ ...prev, sort: sort, order: order }));
    }
    console.log(sidebarData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromurlParam = urlParams.get("searchTerm");
    const typeFromurlParam = urlParams.get("type");
    const parkingFromurlParam = urlParams.get("parking");
    const furnishedFromurlParam = urlParams.get("furnished");
    const offerFromurlParam = urlParams.get("offer");
    const orderFromurlParam = urlParams.get("order");
    const sortFromurlParam = urlParams.get("sort");
    if (
      urlParams ||
      searchTermFromurlParam ||
      typeFromurlParam ||
      parkingFromurlParam ||
      furnishedFromurlParam ||
      offerFromurlParam ||
      orderFromurlParam ||
      sortFromurlParam
    ) {
      setsidebarData({
        searchTerm: searchTermFromurlParam|| "",
        type: typeFromurlParam ||"all",
        offer: offerFromurlParam == "true"?true:false,
        parking: parkingFromurlParam == "true"?true:false,
        furnished: furnishedFromurlParam == "true"?true:false,
        order: orderFromurlParam || "desc",
        sort: sortFromurlParam || "createdAt",
      });
    }
    const fetchData = async () => {
      setshowMore(false)
      setloading(true)
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      const newdata = data.filter((value)=>Object.keys(value).length !== 0)
      setlisting(newdata)
      setloading(false)
      if(newdata.length == 9){
        setshowMore(true)
      }
      else{
        setshowMore(false)
      }
    };
    fetchData();
  }, [location.search]);

  const showMorelisting = async()=>{
    try {
      setshowMore(false)
      const urlParams = new URLSearchParams(location.search)
      urlParams.set('startIndex',listing.length)
      const searchparams = urlParams.toString()
      const res = await fetch(`/api/listing/get?${searchparams}`)
      const data = await res.json()
      const newdata = data.filter((value)=>Object.keys(value).length !== 0)
      console.log(newdata)
      setlisting((prev)=> prev.concat(newdata))
      if(newdata.length == 9){
        setshowMore(true)
      }
      else{
        setshowMore(false)
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="p-7  border-b-2 md: border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
          <div className="flex  flex-col gap-4 items-center sm:flex-row">
            <label className="font-semibold whitespace-nowrap">
              Search Term :
            </label>
            <input
              type="text"
              className="p-2 rounded-lg outline-none"
              placeholder="search"
              id="searchTerm"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                checked={sidebarData.type == "all"}
                onChange={handleChange}
                className="w-5"
              />
              <label className="font-semibold">Rent & Sale</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                checked={sidebarData.type == "rent"}
                onChange={handleChange}
                className="w-5"
              />
              <label className="font-semibold">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                checked={sidebarData.type == "sale"}
                onChange={handleChange}
                className="w-5"
              />
              <label className="font-semibold">Sale</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                checked={sidebarData.offer}
                onChange={handleChange}
                className="w-5"
              />
              <label className="font-semibold">Offer</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                checked={sidebarData.parking}
                onChange={handleChange}
                className="w-5"
              />
              <label className="font-semibold">Parking</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                checked={sidebarData.furnished}
                onChange={handleChange}
                className="w-5"
              />
              <label className="font-semibold">Furnished</label>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="p-2 outline-none rounded-lg"
              value={`${sidebarData.sort}_${sidebarData.order}`}
              onChange={handleChange}
            >
              <option value={"regularPrice_desc"}>Price high to low</option>
              <option value={"regularPrice_asc"}>Price low to high</option>
              <option value={"createdAt_desc"}>Latest</option>
              <option value={"createdAt_asc"}>Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg">
            Search
          </button>
        </form>
      </div>
      <div className="p-5">
      {loading && <p className="text-lg font-bold m-5">Loading..</p>}
      {!loading && listing.length < 1 && <p className="text-lg font-bold m-5">No Listings Found </p>}
      <div className="flex flex-wrap gap-6">
      {listing && !loading && listing.map((listing)=>{
        return <ListingCard key={listing._id} listing={listing}/>
      })}
      </div>
      {showMore && !loading &&
       <p
        className="text-green-500 font-semibold text-center hover:underline cursor-pointer p-4"
        onClick={showMorelisting} >Show More</p> }
      </div>
    </div>
  );
}

export default Search;
