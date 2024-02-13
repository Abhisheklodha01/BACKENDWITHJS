import mongoose from "mongoose"
import { Like } from "../models/like.models.js"
import { Subscription } from "../models/subscription.models.js"
import { Video } from "../models/video.models.js"
import { asynchandler } from "../utils/asynchandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"


const getChannelStats = asynchandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

    // 
    // total videos = call in videos
    const channelStats = await User.aggregate([
        {
            $match: {
                _id : new mongoose.Types.ObjectId(req.user._id,),
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "_id",
                foreignField: "owner",
                as: "videos",
                pipeline:[
                    {
                        $lookup: {
                            from: "likes",
                            localField: "_id",
                            foreignField: "likedBy",
                            as: "likes",
                            pipeline:[
                                {
                                
                                    $addFields: {
                                        
                                        Videolikes: {
                                            $size: "$likes"
                                        }
                                    }
                                }
                                
                            ]
                        }
                    }
                        
                    
                ]
            }
        },
        {
            $addFields: {
                totalViews: {
                    $sum: "$videos.views"
                },
                totalLikes: {
                    $sum: "$videos.VideoLikes"
                },
                totalVideos: {
                    $size: "$videos"
                }
            }
        },
        
    ])

    if(!channelStats) throw new apiError(500, "No data available");

    res
    .status(200)
    .json(new apiResponse(200, channelStats, "Success"))

})

const getChannelVideos = asynchandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel

    
        const totalVideos = await Video.find({owner: req.user._id});
   if(!totalVideos) throw new apiError(500, "No videos available");

    res
    .status(200)
    .json(new apiResponse(200, totalVideos, "Success"))
})

export {
    getChannelStats,
    getChannelVideos
}