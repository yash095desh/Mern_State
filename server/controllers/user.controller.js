import User from "../modals/userModal.js"
import { errorhandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test =(req,res)=>{
    res.status(201).send('UserRoute is working!')
}

export const updateUser = async(req,res,next)=>{
    if(!req.user == req.params.id) return next(errorhandler(401,"You can only update your own account"))

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