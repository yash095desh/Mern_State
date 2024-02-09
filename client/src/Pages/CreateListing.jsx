import React, { useState } from "react";
import { app } from "../firebase.js";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const navigate = useNavigate()  
  const {currentuser} = useSelector((state)=>(state.user))
  const [files, setFiles] = useState([]);
  const [Uploading,setUploading] = useState(false)
  const [imgUploadErr,setImgUploadErr] = useState(false)
  const [loading,setloading] = useState(false)
  const [error,setError] = useState(false)
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const uploadImg = (e) => {
    setImgUploadErr(false)
    setUploading(true)
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImg(files[i]));
      }
      Promise.all(promises)
      .then((urls) => {
        setFormData((prev) => ({ ...prev, imageUrls: prev.imageUrls.concat(urls) }));
        setUploading(false)
      })
      .catch((error)=>{
        setUploading(false)
        setImgUploadErr('Image upload failed (2mb max per image)')
      })
    } else {
      setImgUploadErr('You can only upload 6 images')
      setUploading(false)
    }
  };
  

  const storeImg = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploading(true)
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadUrl) => {
            resolve(downloadUrl);
          })
        }
      );
    });
  };
  const handleDelete = (index)=>{
        setFormData((prev)=>({...prev,imageUrls:formData.imageUrls.filter((_,i)=>(i !== index))}))
        console.log(formData)
  }
  const handleChange = (e)=>{
    if(e.target.id == 'sale' || e.target.id == 'rent'){
        setFormData((prev)=>({...prev, type : e.target.id}))
      
    }
    if(e.target.id == 'parking' || e.target.id == 'furnished'|| e.target.id == 'offer'){
        setFormData((prev)=>({...prev,[e.target.id]:e.target.checked}))
    }
    if(e.target.id =='name'||e.target.id == 'description'|| e.target.id == 'address'||
     e.target.id == 'regularPrice' || e.target.id == 'discountedPrice' || e.target.id == 'bathrooms' 
     || e.target.id == 'bedrooms'){
        setFormData((prev)=>({...prev, [e.target.id] : e.target.value}))
    }

  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(formData.imageUrls.length<1)return setError('You need to upload atlest 1 image')
    console.log(formData.regularPrice ,formData.discountedPrice)
    if(+formData.regularPrice < +formData.discountedPrice)return setError('discount cant be greater than orignal price')
   try {
    setloading(true)
    setError(false)
    const res = await fetch('/api/listing/create',{
        method : "POST",
        headers : {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            ...formData, userRef : currentuser._id
        })
    })
    const data = await res.json()
    if(data.success == false) {
        setError(data.message)
    }
    console.log(data)
    navigate(`/listing/${data._id}`)
    setloading(false)
   } catch (error) {
    setError(error)
    setloading(false)
   }
  }

  return (
    <div className="px-5 m-auto my-10">
      <h1 className="text-4xl font-[900] text-center">Create a Listing</h1>
      <form onSubmit={handleSubmit} >
        <div className=" md:flex md:flex-1 md:justify-around ">
          <div className="">
            <div className="flex flex-col mt-5">
              <input
                type="text"
                id="name"
                required
                minLength='10'
                maxLength='60'
                className="p-2 my-2 outline-none rounded-md"
                placeholder="name"
                onChange={handleChange}
              />

              <textarea
                id="description"
                rows="3"
                required
                className="p-2 my-2 outline-none rounded-md"
                placeholder="Description"
                onChange={handleChange}
              ></textarea>

              <input
                type="text"
                id="address"
                required
                className="p-2 my-2 outline-none rounded-md"
                placeholder="Address"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-8 flex-wrap my-3">
              <div className="flex font-[600] gap-2 ">
                <input type="checkbox" 
                 id="sale"
                  className="w-5" 
                  checked={formData.type == 'sale'}
                  onChange={handleChange}
                  />
                <label> Sell</label>
              </div>
              <div className="flex font-[600] gap-2 ">
                <input type="checkbox"
                 id="rent" 
                 className="w-5"
                 checked={formData.type == 'rent'}
                 onChange={handleChange}
                 />
                <label>Rent</label>
              </div>
              <div className="flex font-[600] gap-2 ">
                <input 
                type="checkbox"
                 id="parking" 
                 className="w-5"
                 checked={formData.parking}
                 onChange={handleChange} />
                <label> Parking Spot</label>
              </div>
              <div className="flex font-[600] gap-2 ">
                <input type="checkbox"
                 id="furnished" 
                 className="w-5" 
                 checked={formData.furnished}
                 onChange={handleChange}
                 />
                <label> Furnished</label>
              </div>
              <div className="flex font-[600] gap-2 ">
                <input type="checkbox" 
                id="offer"
                checked={formData.offer}
                onChange={handleChange}
                 className="w-5" />
                <label>Offer</label>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center font-[600] gap-2">
                <input
                  type="number"
                  className=" w-16 p-2 rounded-md  outline-none"
                  id="bedrooms"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <label>Beds</label>
              </div>
              <div className="flex items-center font-[600] gap-2 my-2">
                <input
                  type="number"
                  className="w-16 p-2 rounded-md  outline-none"
                  id="bathrooms"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <label>Baths</label>
              </div>
            </div>
            <div className=" flex flex-col my-5 flex-wrap gap-6">
              <div className="flex font-[600] gap-2">
                <input type="number" 
                id="regularPrice" 
                className=" w-40 p-2 outline-none"
                min={50}
                max={10000000}
                value={formData.regularPrice}
                onChange={handleChange}
                 />
                <label className="flex flex-col">
                  RegularPrice
                  <span>{formData.type == 'rent'?'($/Month)':'($)'}</span>
                </label>
              </div>
              {formData.offer && 
              <div className="flex font-[600] gap-2">
              <input type="number" 
              id="discountedPrice" 
              className=" w-40 p-2 outline-none"
              min={50}
              max={10000000}
              value={formData.discountedPrice}
              onChange={handleChange}
               />
              <label className="flex flex-col">
                discountedPrice
                <span>($/Month)</span>
              </label>
            </div>}
            </div>
          </div>
          <div className="flex flex-col my-10 ">
            <p className="my-3">
              <span className="font-[600]">Images:</span> The first image will
              be the cover (max6)
            </p>
            <div className="flex gap-2 my-3">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
                className="border-2 p-2 rounded-md"
              />

              <button
                className=" border border-green-600 text-green-600 px-3 py-2 rounded-md font-[800] hover:bg-green-600 hover:text-white"
                onClick={uploadImg}
                type="button"
              >
                {Uploading?"Uploading..":"Upload"}
              </button>
            </div>
            {imgUploadErr && <p className="text-red-600 font-[600]" >{imgUploadErr}</p> }
            {formData.imageUrls.length>0 &&
            formData.imageUrls.map((urls,index)=>{
                return (
                    <div key={urls} className="flex p-2 justify-between border items-center m-2 rounded-md">
                        <img src={urls} 
                        alt="ListingImg"
                         className="w-20 h-20 object-contain rounded-lg"
                          />

                        <button 
                        type="button"
                        className="font-[800] text-red-700 hover:opacity-60"
                        onClick={()=>{handleDelete(index)}}
                        >
                            Delete
                        </button>
                    </div>
                )
            })}
            <button 
            disabled={Uploading}
             className="bg-slate-700 p-3 text-white  rounded-md my-3 hover:opacity-90 disabled:opacity-80"
             >
              {loading?'Creating...':'Create Listing'}
            </button>
            {error && <p className="text-red-600 font-[600]">{error}</p> }
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateListing;
