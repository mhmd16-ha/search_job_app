import mongoose from 'mongoose';

export const dbconn =mongoose.connect('mongodb://127.0.0.1:27017/Jobs').then(()=>{
    console.log("database connection");  
})