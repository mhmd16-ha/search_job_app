
import { ErrorApp } from './../src/utils/ErrorApp.js';
import User from './../database/models/users.model.js';

export const checkMobile=async(req,res,next)=>{
    let isExist=await User.findOne({mobileNumber:req.body.mobileNumber})    
    if(isExist) return next(new ErrorApp('mobile Number already exist',409))
        next()
}

