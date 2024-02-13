import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.models.js"
import {User} from "../models/user.models.js"
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";



const createTweet = asynchandler(async (req, res) => {
    const {content } = req.body
    if(!content ){
        throw new apiError(400,"Invalid/Something messied")
    }
    const tweet =  await Tweet.create({
        content : req.body.content,
        owner : req.user
    } )
    
    if(!tweet) throw new apiError(500,"can't find tweet database")

    res
    .status(200)
    .json( new apiResponse(200 , tweet ,"created") )
})

const getUserTweets = asynchandler(async (req, res) => {
    // ?page=1&limit=10&sortType=new 
    const {userId} =  req.params;
    const { page = 1, limit = 10, sortType } = req.query

    const parsedLimit = parseInt(limit);
    const pageSkip = (page - 1) * parsedLimit;
    const sortBy = sortType === 'new' ? 1 : -1;


    if(!userId ){
        throw new apiError(400,"Invalid/Something messied")
    }

    const tweets = await Tweet
    .find({owner : ObjectId(userId)})
    .sort({createdAt : sortBy})
    .skip(pageSkip)
    .limit(parsedLimit)


    if(!tweets) throw new apiError(500,"can't find tweet")
    res
    .status(200)
    .json( new apiResponse(200 , tweets ,"success") )
})

const updateTweet = asynchandler(async (req, res) => {
    const {updateTweetContent} = req.body;
    const {tweetId} =  req.params;
    if(!(updateTweetContent || tweetId) ){
        throw new apiError(400,"Invalid/Something messied")
    }

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId, 
        {
            $set:{
                content : updateTweetContent
            }
        }, 
        {new : true}
    )
    if(!tweet) throw new apiError(500,"can't find tweet")

    res
    .status(200)
    .json( new apiResponse(200 , tweet ,"updated") )
})

const deleteTweet = asynchandler(async (req, res) => {
    const {tweetId} =  req.params;
    if(!(tweetId) ){
        throw new apiError(400,"Invalid/Something messied")
    }

    const tweet = await Tweet.findByIdAndDelete(tweetId,)
    if(!tweet) throw new apiError(500,"can't find tweet")

    res
    .status(200)
    .json( new apiResponse(200 , tweet ,"updated") )
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}