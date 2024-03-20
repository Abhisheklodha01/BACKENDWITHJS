import express from 'express'
import { GenerateShortURL, getAnylytics } from '../controller/url.controller.js'

const router = express.Router()

router.post('/', GenerateShortURL)

router.get('/analytics/:shortId', getAnylytics)


export default router