import companyRouter from "./modules/company/company.routes.js"
import jobRouter from "./modules/Jobs/job.routes.js"
import usersRouter from "./modules/users/user.routes.js"


export const Routes=(app)=>{
    app.use('/api/v1/users',usersRouter)
    app.use('/api/v1/company',companyRouter)
    app.use('/api/v1/jobs',jobRouter)
}