import User from "../modals/userModal.js"
import Listing from "../modals/listingModel.js"
import { errorhandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test =(req,res)=>{
    res.status(201).send('UserRoute is working!')
}

export const updateUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorhandler(401,"You can only update your own account"))

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        const response = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                avatar : req.body.avatar,
            }
        },{new : true})

        const {password:pass, ...rest} = response._doc
        res
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorhandler(401,"You can make changes only in your account"))

    try {
        const response = await User.findByIdAndDelete(req.params.id)
        const para = JSON.stringify(req.params)
        res.clearCookie('access_token');
        res 
            .status(200)
            .json(`User has been deleted`)

    } catch (error) {
        next(error)
        console.log(error)
    }
}

export const signOut = async (req,res,next)=>{
    if(req.user.id !== req.params.id)return next(errorhandler(401,"You cant signout others account"))

    try {
        res.clearCookie('access_token')
        res
            .status(200)
            .json('Successfully signOut')
        
    } catch (error) {
        next(errorhandler(error))
    }
}

export const showlisting = async(req,res,next)=>{
    if(req.user.id !== req.params.id)return next(errorhandler(401),"Unauthrised")

    try {
        const result = await Listing.find({ userRef : req.params.id })
        res.status(200).json(result)

    } catch (error) {
        next(error)
    }
}