import express, { urlencoded } from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";

const app=express();

app.use(express());
app.use(express.json({limit:'16kb'}))
app.use(urlencoded({extends:true,limit:'16kb'}))
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(express.static('public'))
app.use(cookieParser())
export {app};