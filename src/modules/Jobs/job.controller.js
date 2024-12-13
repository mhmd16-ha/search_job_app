import Job from './../../../database/models/job.model.js';
import { catchError } from './../../../middleware/catchError.js';
import Company from './../../../database/models/company.model.js';
import Application from './../../../database/models/application.model.js';

const addJob=catchError(async (req,res,next)=>{
    let job=new Job(req.body)
    await job.save()
    res.json({ message: "success", job });
})
const updatejob=catchError(async (req,res,next)=>{
    let job=await Job.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json({ message: "success", job });
})
const deletejob=catchError(async (req,res,next)=>{
    let job=await Job.findByIdAndDelete(req.params.id)
    res.json({ message: "success", job });
})
const GetAllJobsSpecificCompany=catchError(async (req,res,next)=>{
    let company=await Company.findOne({companyName:req.query.name})
    
    let job=await Job.find({addedBy:company.companyHR})
    
    res.json({ message: "success", job });
})
const GetAllJobs=catchError(async (req,res,next)=>{
    let job=await Job.find()    
    res.json({ message: "success", job });
})
const applyToJob=catchError(async (req,res,next)=>{
    let application=new Application(req.body)
    await application.save()
    res.json({ message: "success", application });
})


export{
    addJob,updatejob,deletejob,GetAllJobsSpecificCompany,GetAllJobs,applyToJob
}