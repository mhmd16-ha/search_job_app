import { catchError } from "../../../middleware/catchError.js";
import Company from './../../../database/models/company.model.js';


const addCompany=catchError(async (req,res,next)=>{
    let company=new Company(req.body)
    await company.save()
    res.json({ message: "success", company });
})
const updateCompany=catchError(async (req,res,next)=>{
    let company=await Company.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json({ message: "success", company });
})
const deleteCompany=catchError(async (req,res,next)=>{
    let company=await Company.findByIdAndDelete(req.params.id)
    res.json({ message: "success", company });
})
const getCompanyData=catchError(async (req,res,next)=>{
    let company=await Company.findById(req.params.id)
    res.json({ message: "success", company });
})
const searchWithCompany=catchError(async (req,res,next)=>{
    if(req.query){
    let company=  await Company.find({companyName:{$regex:req.query.search,$options:'i'}})
    res.json({ message: "success", company });
     }
})
const getAllApplication=catchError(async (req,res,next)=>{
   
})


export{
    addCompany,updateCompany,deleteCompany,getCompanyData,searchWithCompany
}