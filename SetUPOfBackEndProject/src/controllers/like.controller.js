import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.models.js"
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";


const toggleVideoLike = asynchandler(async (req, res) => {
    const {videoId} = req.params
     if (!videoId) throw new apiError(404, "Id not found");

     const like = await Like.create({video : videoId, likedBy : req.user})
     if(!like) throw new apiError(504, "Couldn't create like");

     res
     .status(200)
     .json( new apiResponse(200, like , "Success"))
})

const toggleCommentLike = asynchandler(async (req, res) => {
    const {commentId} = req.params
    if (!commentId) throw new apiError(404, "Id not found");

    const like = await Like.create({comment : commentId, likedBy : req.user})
    if(!like) throw new apiError(504, "Couldn't create like");

    res
    .status(200)
    .json( new apiResponse(200, like , "Success"))

})

const toggleTweetLike = asynchandler(async (req, res) => {
    const {tweetId} = req.params
    
     if (!tweetId) throw new apiError(404, "Id not found");

     const like = await Like.create({tweet : tweetId, likedBy : req.user})
     if(!like) throw new apiError(504, "Couldn't create like");

     res
     .status(200)
     .json( new apiResponse(200, like , "Success"))
}
)

const getLikedVideos = asynchandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query
    const parsedLimit = parseInt(limit);
    const pageSkip = (page - 1) * parsedLimit;
    const allLikedVideos = await Like.find({video : req.user._id}).skip(pageSkip).limit(parsedLimit);
    if(!allLikedVideos) throw new apiError(504, "Couldn't find likes video");

     res
     .status(200)
     .json( new apiResponse(200, allLikedVideos, "Success"))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}