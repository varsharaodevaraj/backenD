import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import userModel from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req,res) => {
    // get user details from frontend
    // validation : like empty email tho nhi h ya may be email/username correct h correct format mein h as such
    // check if user already exists: may by username or may be by email
    // check for images , check for avatar
    // upload to cloudinary
    // create user object - create entry in db
    // remove password and refreshtoken field from response
    // check for user creation
    // return response


    // get user details from frontend:
    const {fullname,email,username,password} = req.body

    // validation:
    if(fullname===""){
        throw new ApiError(400,"fullname is required")
    }
    if(email===""){
        throw new ApiError(400,"email is required")
    }
    if(username===""){
        throw new ApiError(400,"username is required")
    }
    if(password===""){
        throw new ApiError(400,"password is required")
    }

    // or there is a simple method to have checks for thi instead of doing these many if else checks:
    // if(
    //     [fullname,email,username,password].some((fields) => fields?.trim() === "" )
    // ){
    //     throw new ApiError(400,"All fields are required")
    // }

    // check if user already exists: may by username or may be by email:
    const existedUSer = userModel.findOne({
        $or: [{username},{email}]
    })

    if(existedUSer){
        throw new ApiError(409,"User with email or username already exists")
    }

    // check for images , check for avatar:
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required!")
    }

    // upload them to cloudinary:
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverimg = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required!")
    }

    // create user object - create entry in db:
    const user = await userModel.create({
        fullname,
        avatar: avatar.url,
        coverimg: coverimg?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUSer = await userModel.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUSer){
        throw new ApiError(500,"Something went wrong while registration!")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUSer,"User registered succesfully")
    )
})

export default registerUser