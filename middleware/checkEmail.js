
import { ErrorApp } from './../src/utils/ErrorApp.js';
import User from './../database/models/users.model.js';

export const checkEmail=async(req,res,next)=>{
    let isExist=await User.findOne({email:req.body.email})
    if(isExist) return next(new ErrorApp('email already exist',409))
        next()
}

