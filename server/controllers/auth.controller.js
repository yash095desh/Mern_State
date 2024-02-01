import User from "../modals/userModal.js"

export const signUp = async(req,res)=>{
    const {username,email,password} = req.body
    const newUser = new User({username,email,password})
    try {
        await newUser.save()
        res.status(201).send('new User Created !')
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
 }