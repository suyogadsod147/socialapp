import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import {uplodOnCloudinary} from "../utils/cloudinary.js" 
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req , res)=>{

    // res.status(200).json({
    //     massege:"chai aur code"
    // })

    const {fullname , email , username , password } =  req.body
   
    // console.log("email : ",email)
  

    // if(fullname === ""){
    //      throw new ApiError(400 ,"fullname is required" )
    // }
    // to check the wether the input is empty or not

    // advance code for same

    if([fullname,password,username,email].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"Please fill all the fields")
    }
    // field is to check weather field is empty or not 
    // trim remove the spaces in the field

    const existedUser = User.findOne({
        $or : [{ username },{email}]
    })

    if(existedUser){
        throw new ApiError(409 , 'already_exists')
    }

   const avatarLocalPath =  req.files?.avatar[0]?.path;
   const coverImageLocalPath =  req.file?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400 , "Avatar is required");
   }

   const avatar = await uplodOnCloudinary(avatarLocalPath)
   const coverImage = await uplodOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400, "Avatar is required");
   }

   const user  = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password
   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!createdUser) {
    throw new ApiError(500, "Internal server error while registring user");
   }


   return res.status(201).json(
    new ApiResponse(200 , createdUser , "user registered successfully")
   )


})

export {registerUser}