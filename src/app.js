import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app =express();

app.use(express());
app.use(cors({origin:process.env.CORS_ORIGIN,Credential:true}))
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({
    limit:'16kb',extends:true
}));
app.use(cookieParser());
app.use(express.static('public'))

// routes import
import userRouter from './routes/user.route.js'

// routes declaration
app.use('/api/v1/accounts',userRouter)
export {app}