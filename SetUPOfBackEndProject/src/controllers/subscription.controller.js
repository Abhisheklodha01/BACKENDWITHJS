import mongoose, { isValidObjectId } from "mongoose"
import { Subscription } from "../models/subscription.models.js"
import { User } from "../models/user.models.js"
import { asynchandler } from "../utils/asynchandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"



const toggleSubscription = asynchandler(async (req, res) => {
    // /c/65a17b842615d1ca34ba31dc
    const { channelId } = req.params
    if (!channelId) {
        throw new apiError(400, "Invalid/Something messied")
    }

    const subscribed = await Subscription.create({
        subscriber: req.user,
        // channel : new mongoose.Types.ObjectId(channelId)
        channel: channelId
    })

    if (!subscribed) {
        throw new apiError(500, "subscribed failed")
    }

    res
        .status(200)
        .json(new apiResponse(200, subscribed, "you are subscribed to this channel"))

})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asynchandler(async (req, res) => {
    const { channelId } = req.params
    if (!channelId) {
        throw new apiError(400, "Invalid/Something messied")
    }

    const userSubscribedChannels = await Subscription.aggregate([
        {
            $match: {
                subscriber: channelId
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "channels",
                pipeline: [
                    
                    {
                        $project: {
                            userName: 1,
                            email : 1,
                            avatar: 1,
                        }
                    }
                ]
            },

            

        },
        {
            $addFields : {
                channelsDetails : {
                    $arrayElemAt: ["$ownerResult", 0],
                }
            }
        },
    ])


    if (!userSubscribedChannels) {
        throw new apiError(500, "finding failed")
    }

    res
        .status(200)
        .json(new apiResponse(200, userSubscribedChannels, "you are subscribed to this channel"))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asynchandler(async (req, res) => {
    const { subscriberId } = req.params
    if (!subscriberId) {
        throw new apiError(400, "Invalid/Something messied")
    }
    const userSubscribedChannels = await Subscription.aggregate([
        {
            $match: {
                subscriber: subscriberId
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "channel",
                foreignField: "_id",
                as: "channels",
                pipeline: [
                    
                    {
                        $project: {
                            userName: 1,
                            email : 1,
                            avatar: 1,
                        }
                    }
                ]
            },

            

        },
        {
            $addFields : {
                channelsDetails : {
                    $arrayElemAt: ["$ownerResult", 0],
                }
            }
        },
    ])


    if (!userSubscribedChannels) {
        throw new apiError(500, "finding failed")
    }

    res
        .status(200)
        .json(new apiResponse(200, userSubscribedChannels, "you are subscribed to this channel"))
})

export {
    getSubscribedChannels, getUserChannelSubscribers, toggleSubscription
}