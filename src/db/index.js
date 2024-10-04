import mongoose from "mongoose";
import { DB_Name } from "../constant.js";

const conectDB= async()=>{
    try {
      const connectionInstance=await mongoose.connect( `${process.env.MONGODB_URI}/${DB_Name}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`mongodb connected ! , DB host is :${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('connection error',error)
        process.exit(1);
    }
}
export default conectDB