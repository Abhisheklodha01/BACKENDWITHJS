import { nanoid } from 'nanoid'
import { URL } from '../models/url.model.js'
import { json } from 'express';

const GenerateShortURL = async (req, res) => {
    try {
        const body = req.body
        console.log(req.body);
        if (!body.url) {
            return res.status(400).json({
                message: 'url is required'
            })
        }
        const shortId = nanoid(8)
        await URL.create({
            shortId,
            redirectURL: body.url,
            visitHistory: []
        })

        return res.json({
            id: shortId
        })
    } catch (error) {
        res.json({ error })
    }
}

const getAnylytics = async (req, res) => {
    try {
        const shortId = req.params.shortId
        const result = await URL.findOne({ shortId })
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        })
    } catch (error) {

    }
}



export { GenerateShortURL, getAnylytics }