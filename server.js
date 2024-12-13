import express from 'express'
import { Routes } from './src/Routes.js';
import { dbconn } from './database/dbConnection.js';
import { globalError } from './middleware/globalErrors.js';
import 'dotenv/config'
const app = express()
const port = 3000
app.use(express.json())
Routes(app)
app.use(globalError);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))