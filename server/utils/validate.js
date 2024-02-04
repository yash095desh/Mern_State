import { errorhandler } from "./error.js";
import jwt from "jsonwebtoken";


export const validateuser = (req,res,next)=>{
    const token = req.cookies.access_token;

    if(!token) return next(errorhandler(401,"Unauthorized"))
    
    jwt.verify(token,process.env.JWTSECRET,(err,user)=>{
        if(err) return next(errorhandler(400,"Forbidden"))

        req.user = user
    })
    next()
}

