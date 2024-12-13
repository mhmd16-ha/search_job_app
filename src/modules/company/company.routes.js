
import express from 'express'
import { addCompany,updateCompany ,deleteCompany,getCompanyData,searchWithCompany} from './company.controller.js'

const companyRouter=express.Router()
companyRouter.route('/').post(addCompany).put(updateCompany).get(searchWithCompany)
companyRouter.route('/:id').put(updateCompany).delete(deleteCompany).get(getCompanyData)

export default companyRouter 