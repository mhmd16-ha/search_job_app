import jwt  from 'jsonwebtoken';
import { catchError } from './catchError.js';
import { ErrorApp } from './../src/utils/ErrorApp.js';
import User from './../database/models/users.model.js';

const protectRoutes=catchError(async(req,res,next)=>{
    let {token}=req.headers;
    let userPayload=null;
    if(!token) return next(new ErrorApp('token not provided',401))
    jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
        if(err) next(new ErrorApp(err,401))
        userPayload=payload
    })
    let user=await User.findById(userPayload.UserId)
    console.log(user);
    if(!user) return next(new ErrorApp('user not found',404))
        if(user.passwordChangedAt){
            let time=parseInt(user.passwordChangedAt.getTime()/1000)
            if(time>userPayload.iat) return next(new ErrorApp('invaild token ... login again',401))
        }
    req.user=user
    next()
    
    })

const allowedTo=(...roles)=>{
    return catchError(async(req,res,next)=>{
    if(roles.includes(req.user.role)){
        return next()
    }
    return next (new ErrorApp('you are not authorize to acess this endpoint',401))
    }
    )}

    export{
        protectRoutes , allowedTo
    }