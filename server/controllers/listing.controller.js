import Listing from "../modals/listingModel.js"
import { errorhandler } from "../utils/error.js"

export const createListing =async (req,res,next)=>{
    try {
        const listing = await Listing.create(req.body)
            res.status(200).json(listing)

    } catch (error) {
        next(errorhandler(error))
    }
}

export const deleteListing = async (req,res,next)=>{
    const listing = await Listing.findById(req.params.id)
    if(!listing) return next(errorhandler(401,"Listing not found"))

    if(req.user.id !== listing.userRef) return next(errorhandler(401,"Not Authorized"))

    try {
         await Listing.findByIdAndDelete(req.params.id);
            res.status(200).json("deleted Successfully")
    } catch (error) {
        next(errorhandler(error))
    }
}

export const updateListing = async (req,res,next)=>{
    const listing = await Listing.findById(req.params.id)

    if(!listing) return next(errorhandler(401,'Listing not found'))
    if(req.user.id !== listing.userRef) return next(errorhandler(401,"Not Authorized"))

    try {
      const result =  await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
            res.status(200).json(result)
    } catch (error) {
        next(errorhandler(error))
    }
}
export const fetchListing = async (req,res,next)=>{
    try {
        const result  = await Listing.findById(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        next(errorhandler(error))
    }
}