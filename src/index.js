import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv'
import conectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:'./.env'
})

conectDB()
.then(()=>{
app.listen(process.env.PORT || 6000 ,()=>{
    console.log(`server is runing at:${process.env.PORT}`)
})
})
.catch((error)=>{
console.log("server is not running of this port that you provided",error)
})

/*
const app=express();
(async ()=>{
    try {
       mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
       app.on("error",(error)=>{
        console.log('Errr:',error)
       }) 
       app.listen(process.env.PORT,()=>{
        console.log(`App is listing on port${procees.env.PORT}`);
       })
    } catch (error) {
        console.error('Error',error)
        throw error
    }
})()
*/