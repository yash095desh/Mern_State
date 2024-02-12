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
export const getlistings = async(req,res,next)=>{
    try {
        const limit = parseInt(req.query.limit) || 9 ;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        if(offer == undefined || offer == 'false'){
            offer = {$in : [false,true]}
        }

        let furnished = req.query.furnished;
        if(furnished == undefined || furnished == 'false'){
            furnished = {$in :[false,true]}
        }
        let parking = req.query.parking;
        if(parking == undefined || parking == 'false'){
            parking = {$in :[false,true]}
        }
        let type = req.query.type;
        if(type == undefined || type == 'all'){
            type = {$in :['rent','sale']}
        }
        const searchTerm = req.query.searchTerm || ''

        const sort = req.query.sort || 'createdAt'
        const order = req.query.order || 'desc'

        const result = await Listing.find({
            name :{$regex : searchTerm,$options : 'i'},
            offer ,
            furnished,
            parking,
            type,
        })
            .sort({[sort]:order})
            .limit(limit)
            .skip(startIndex)

        res.status(200).json(result)

    } catch (error) {
        next(error)
    }

}