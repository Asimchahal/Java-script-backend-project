import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser=asyncHandler(async (req,res) => {
    
    // step 1 : get user details from frontend 
    // step 2 : valdition -not empty
    // step 3 : check if user already exist  userName,email
    // step 4 : check for images ,check avatar
    // step 5 : upload them to cloudinary,check avatar
    // step 6 : create user object -create entry in db
    // step 7 : remove password and refresh token field from response
    // step 8 : check for user creation
    // step 9 : return res
                 
 // step 1

    const{userName,fullName,email,password}=req.body
    console.log('your frontend data:',fullName,userName,password,email)
                 
// step 2

    if(
        [fullName,userName,email,password].some((field)=>field?.trim()==="")
    ){
       throw new ApiError(400,"All fields are required ");
       
    }

// step 3


const existedUser=User.findOne({
    $or:[{email},{userName}]
})

if(existedUser){
    throw new ApiError(409,"user with email or userName already exist")
}

// step 4

const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLocalPath=req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400,"Avatar File is required");
    
}
})

// step 5

const avatar=await uploadOnCloudinary(avatarLocalPath);
const coverImage=await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
    throw new ApiError(400,"Avatar File is Required!!!")
}

// step 6

     const user =await  User.create({
        fullName,
        userName.toLowerCase(),
        email,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url || ""
       })

// step 7

  const createdUser= await User.findById(user._id).some('-Password -refreshToken')

// step 8

  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering !!!");
  }

// step 9 

return res.status(201).json(
    new ApiResponse(200,createdUser,'User Registered successfully!!!')
)
export{registerUser}