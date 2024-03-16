import express from 'express'
import {
    DeleteUser,
    FindUserByUserID,
    GetAllUsers,
    NewUser,
    UpdateUser
}
    from '../controller/user.controller.js'

const router = express.Router()


router.get("/allusers", GetAllUsers)

router.post("/newuser", NewUser)

router.route("/userid/:id")
    .get(FindUserByUserID)
    .put(UpdateUser)
    .delete(DeleteUser)



export default router