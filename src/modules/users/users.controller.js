import User from "./../../../database/models/users.model.js";
import { catchError } from "./../../../middleware/catchError.js";
import bcrypt from "bcrypt";
import { ErrorApp } from "./../../utils/ErrorApp.js";
import  jwt  from 'jsonwebtoken';

const addUser = catchError(async (req, res, next) => {
  req.body.userName = req.body.firstName + req.body.lastName;
  let user = new User(req.body);
  await user.save();
let token=jwt.sign({UserId:user._id,role:user.role},process.env.JWT_KEY)
  res.json({ message: "success", token });
});
const signIn = catchError(async (req, res, next) => {
  let user = null;
  if (req.body.mobileNumber)user = await User.findOne({ mobileNumber: req.body.mobileNumber });
  if (req.body.email) user = await User.findOne({ email: req.body.email });
  if (req.body.recoveryEmail) user = await User.findOne({ recoveryEmail: req.body.recoveryEmail });  
  if (user.email && bcrypt.compareSync(req.body.password, user.password)) {
    await User.findOneAndUpdate({ email: user.email },{status: "online"},{new:true});
    let token=jwt.sign({UserId:user._id,role:user.role},process.env.JWT_KEY)
    res.json({ message: "success login", token });
  }
  next(new ErrorApp("email or password is incorrect", 401));
});
const updateAcount = catchError(async (req, res, next) => {

  let user = await User.findOne({ _id: req.params.id });
  if (user.status == "online") {
    user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    user || next(new ErrorApp("user not found", 404));
    !user || res.json({ message: "success", user });
  }
  next(new ErrorApp("user must be login first", 404));
});
const deleteAcount = catchError(async (req, res, next) => {
  let user = await User.findOne({ _id: req.params.id });
  if (user.status == "online") {
    user = await User.findByIdAndDelete(req.params.id);
    user || next(new ErrorApp("user not found", 404));
    !user || res.json({ message: "success", user });
  }
  next(new ErrorApp("user must be login first", 404));
});
const getAcountData = catchError(async (req, res, next) => {
  let user = await User.findOne({ _id: req.params.id });
  if (user.status == "online") {
    user = await User.findById(req.params.id);
    user || next(new ErrorApp("user not found", 404));
    !user || res.json({ message: "success", user });
  }
  next(new ErrorApp("user must be login first", 404));
});
const getUserData = catchError(async (req, res, next) => {
  let user = await User.findOne({ _id: req.params.id });
  if (user.status == "online") {
    user = await User.findById(req.params.id);
    user || next(new ErrorApp("user not found", 404));
    !user || res.json({ message: "success", user });
  }
  next(new ErrorApp("user must be login first", 404));
});
const getAllAssociatedEmail = catchError(async (req, res, next) => {
  let user = await User.find({ recoveryEmail: req.body.recoveryEmail });
  user || next(new ErrorApp("user not found", 404));
  !user || res.json({ message: "success", user });
});
const updatePassword = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user&&bcrypt.compareSync(req.body.oldpassword,user.password)) {
      user = await User.findOneAndUpdate({email:req.body.email},{password:req.body.newpassword,passwordChangedAt:Date.now()},{ new: true });
      user || next(new ErrorApp("user not found", 404));
      !user || res.json({ message: "success", user });
    }
    next(new ErrorApp("user must be login first", 404));
});
const forgetPassword = catchError(async (req, res, next) => {
  
});


export {
  addUser,
  signIn,
  updateAcount,
  deleteAcount,
  getAcountData,
  getUserData,
  getAllAssociatedEmail,updatePassword,forgetPassword
};
