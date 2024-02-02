import User from "../modals/userModal.js"
import bcryptjs from 'bcryptjs'

export const signUp = async(req,res,next)=>{
    const {username,email,password} = req.body
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({username,email,password:hashedPassword})
    try {
        await newUser.save()
        res.status(201).json({success:true,message:'User Created Successfully'})
    } catch (error) {
        next(error)
    }
 }
 