import mongoose, { isValidObjectId } from "mongoose"
import { Playlist } from "../models/playlist.models.js"
import { asynchandler } from "../utils/asynchandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";



const createPlaylist = asynchandler(async (req, res) => {
    const { name, description } = req.body
    if (!(name || description)) throw new apiError(400, "name or description is required");

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user
    })

    if (!playlist) throw new apiError(500, "playlist is creating failed");


    res
        .status(200)
        .json(new apiResponse(200, playlist, "playlist created successfully"))
})

const getUserPlaylists = asynchandler(async (req, res) => {
    const { userId } = req.params
    if (!userId) throw new apiError(400, "userId required");

    const getUserPlaylists = await Playlist.find({ owner: userId });

    if (!getUserPlaylists) throw new apiError(500, "playlists not found");

    res
        .status(200)
        .json(new apiResponse(200, getUserPlaylists, "playlists found successfully"))
})

const getPlaylistById = asynchandler(async (req, res) => {
    const { playlistId } = req.params
    if (!playlistId) throw new apiError(400, "userId required");

    const getUserPlaylist = await Playlist.findById(playlistId);

    if (!getUserPlaylist) throw new apiError(500, "playlists not found");

    res
        .status(200)
        .json(new apiResponse(200, getUserPlaylist, "playlists found successfully"))


})

const addVideoToPlaylist = asynchandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    if (!(playlistId || videoId)) throw new apiError(400, "userId required");
    const videoAdded = await Playlist.findById(playlistId);

    //* find you are right owner or you are not
    if (videoAdded.owner !== req.user) {
        throw new apiError(400, "you are not allowed to")
    }

    videoAdded.videos.push(videoId);


    try {
        await videoAdded.save({ validateBeforeSave: false });
    } catch (error) {
        console.log(error);
        throw new apiError(500, "something went wrong while saving video")
    }


    res
        .status(200)
        .json(new apiResponse(200, videoAdded, "video added"))


})

const removeVideoFromPlaylist = asynchandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    const playlist = await Playlist.findById(playlistId);

    // Check if the playlist exists
    if (!playlist) {
        throw new apiError(404, "Playlist not found");
    }

    // Check if the user is the owner of the playlist
    if (playlist.owner !== req.user) {
        throw new apiError(403, "You are not allowed to remove videos from this playlist");
    }

    // Remove the video from the playlist's videos array
    playlist.videos = playlist.videos.filter(vid => vid !== videoId);

    // Save the updated playlist
    try {
        await playlist.save();
    } catch (error) {
        console.log(error);
        throw new apiError(500, "something went wrong while saving video")
    }

    res.status(200).json(new apiResponse(200, playlist, "Video removed from playlist"));

})

const deletePlaylist = asynchandler(async (req, res) => {
    const { playlistId } = req.params

    const playlist = await Playlist.findById(playlistId);

    // Check if the playlist exists
    if (!playlist) {
        throw new apiError(404, "Playlist not found");
    }

    // Check if the user is the owner of the playlist
    if (playlist.owner !== req.user) {
        throw new apiError(403, "You are not allowed to remove videos from this playlist");
    }

    await playlist.remove();

    res.status(200).json(new apiResponse(200, playlist, "playlist removed from database"));


})

const updatePlaylist = asynchandler(async (req, res) => {
    const { playlistId } = req.params
    const { name, description } = req.body

    const playlist = await Playlist.findById(playlistId);

    // Check if the playlist exists
    if (!playlist) {
        throw new apiError(404, "Playlist not found");
    }

    // Check if the user is the owner of the playlist
    if (playlist.owner !== req.user) {
        throw new apiError(403, "You are not allowed to remove videos from this playlist");
    }

    // Update the playlist properties
    if (name) {
        playlist.name = name;
    }

    if (description) {
        playlist.description = description;
    }

    try {
        // Save the updated playlist
        await playlist.save();
    } catch (error) {
        throw new apiError(503, `Something went wrong during save: ${error}`);
    }


    res.status(200).json(new apiResponse(200, playlist, "playlist updated successfully"));

})

export {
    addVideoToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylists, removeVideoFromPlaylist, updatePlaylist
}