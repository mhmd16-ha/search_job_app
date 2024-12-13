
import express from 'express'
import { addJob ,updatejob,deletejob,GetAllJobsSpecificCompany,GetAllJobs, applyToJob} from './job.controller.js'
import { allowedTo, protectRoutes } from '../../../middleware/auth.js'

const jobRouter=express.Router()
jobRouter.route('/').post(addJob).get(GetAllJobs)
jobRouter.route('/application').post(protectRoutes,allowedTo("user"),applyToJob)
jobRouter.route('/Get-All-Jobs-SpecificCompany').get(GetAllJobsSpecificCompany)
jobRouter.route('/:id').put(updatejob).delete(deletejob)

export default jobRouter 