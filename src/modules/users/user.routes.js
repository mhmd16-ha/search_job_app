import express from 'express'
import { addUser, deleteAcount, getAcountData, getAllAssociatedEmail, getUserData, signIn, updateAcount, updatePassword } from './users.controller.js'
import { checkEmail } from '../../../middleware/checkEmail.js'
import { checkMobile } from './../../../middleware/checkMobile.js';
import { protectRoutes } from '../../../middleware/auth.js';

const usersRouter=express.Router()

usersRouter.route('/signup').post(checkEmail,addUser)
usersRouter.route('/signin').post(signIn)
usersRouter.route('/update-account/:id').put(protectRoutes,checkEmail,checkMobile,updateAcount)
usersRouter.route('/update-password').put(protectRoutes,updatePassword)
usersRouter.route('/:id').post(protectRoutes,deleteAcount)
usersRouter.route('/getAccountdata/:id').get(protectRoutes,getAcountData)
usersRouter.route('/getuserdata/:id').get(getUserData)
usersRouter.route('/get-all-associated-email').get(getAllAssociatedEmail)


export default usersRouter 