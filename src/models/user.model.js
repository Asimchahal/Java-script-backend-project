import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jsonwebtoken from "jsonwebtoken";
const userSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            index:true
        },
        fullname:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true
        },
        avatar:{
            type:String,//cloudinary url
            required:true,
           
        },
        coverImage:{
            type:String, //cloudinary url
            required:true,
        },
       watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:'Video'
        }
       ],
       password:{
        type:String,
        required:[true,'Password is requird!']
       },
       refreshToken:{
        type:String
       }
    }
    ,{timestamps:true})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next() 
})
userSchema.methods.isPasswordCorrect=async function (password) {
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return jsonwebtoken.sign({
        _id:this._id,
        email:this.email,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken=function(){
    return jsonwebtoken.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET
    ,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User = mongoose.model('User',userSchema)