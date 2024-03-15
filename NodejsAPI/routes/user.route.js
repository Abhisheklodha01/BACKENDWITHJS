import express from 'express'
import { FindUserByUserID, GetAllUsers, NewUser } from '../controller/user.controller.js'

const router = express.Router()


router.get("/allusers", GetAllUsers)


router.post("/newuser", NewUser)

// dynamic url

router.get("/userid/:id", FindUserByUserID)



export default router