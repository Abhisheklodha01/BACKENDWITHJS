import { apiResponse } from "../utils/apiResponse.js"
import { asynchandler } from "../utils/asynchandler.js"


const healthcheck = asynchandler(async (req, res) => {
    
    res
    .status(200)
    .json(new apiResponse(200, {}, "OK"))
})

export {
    healthcheck
    }
    