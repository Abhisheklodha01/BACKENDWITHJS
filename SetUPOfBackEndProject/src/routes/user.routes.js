import { Router } from 'express';
import { upload } from '../middlewares/multer.js'
import {
    changeCurrentPassWord,
    getCurrentUser,
    getUserChannelProfile,
    getUserWatchHistory,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registorUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.js';


const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },

        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registorUser)

router
     .route("/login")
           .post(loginUser)

// secured routes

router
    .route("/logout")
         .post(verifyJWT, logoutUser)

router
    .route("/refresh-token")
         .post(refreshAccessToken)

router
    .route("/changepassword")
         .post(verifyJWT, changeCurrentPassWord)

router
    .route("/getcurrentuser")
          .get(verifyJWT, getCurrentUser)

router
    .route("/updatedetails")
          .patch(verifyJWT, updateAccountDetails)

router
    .route("/avatar")
         .patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

router
    .route("/coverImage")
          .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router
    .route("/c/:username")
          .get(verifyJWT, getUserChannelProfile)

router
    .route("/history")
         .get(verifyJWT, getUserWatchHistory)

export default router;