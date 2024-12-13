import mongoose, { Types }  from "mongoose";
import bcrypt from 'bcrypt'
const schema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:String,
    email:{
        type:String,
        unique:[true,"email is required"],
      },
    password:String,
    recoveryEmail:String,
    DOB:Date,
    mobileNumber:{
        type:String,
        unique:[true,"mobileNumber is required"],
      },
    role:{
        type:String,
        enum:['admin','user','Company_HR'],
        default:'user'
    },
    status:{
        type:String,
        enum:['online','offline'],
        default:'offline'
    },
    passwordChangedAt:Date
},{
    versionKey:false,
    timestamps:true
})
schema.pre('save',function(){
    if(this.password)  this.password=bcrypt.hashSync(this.password,8)
})
schema.pre('findOneAndUpdate',function(){
 if(this._update.password)  this._update.password=bcrypt.hashSync(this._update.password,8)
})
const User=mongoose.model('User',schema)
export default User