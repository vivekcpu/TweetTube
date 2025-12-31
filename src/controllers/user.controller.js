import {asyncHandler} from  "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{

//get user details from frontend
//validation-not empty
//check if user already exists: username, email
// upload them to cloudinary, avatar
// create user object - create entry in db
// remove password and refresh token field from response
// check for user creation
// return res

const {fullname,username,email,password} = req.body;

if(
    [fullname,email,password,username].some((field)=>
   field?.trim() === "")
){
throw new ApiError(400,"All fields are compulsory");
}

const existedUser = User.findOne({
    $or: [{email},{username}]
})

if(existedUser){
    throw new ApiError(409, "User with email or username already exists");
}

const avatarLoacalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverIMage?.path;

if(!avatarLoacalPath){
    throw new ApiError(400,"Avatar file is required");
}

const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
     throw new ApiError(400,"Avatar file is required");
}

const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url ||"",
    email,
    password,
    username:username.toLowerCase(),
});

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(500,"Something went wrong while registring the user");
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully"),
)

})

export {registerUser};