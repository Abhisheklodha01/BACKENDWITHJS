import { User } from "../models/user.model.js"

const NewUser = async (req, res) => {

    const { name, email, password } = req.body
    const user = await User.create({
        name,
        email,
        password
    })

    res.status(201).json({
        success: true,
        message: "Registerd Successfully"
    })
}

const GetAllUsers = async (req, res) => {

    const users = await User.find({})
    res.json({
        success: true,
        users,
    })
}

const FindUserByUserID = async (req, res) => {
    // const {id} = req.query
    // console.log(req.params);

    const { id } = req.params
    const user = await User.findById(id)

    res.json({
        success: true,
        user
    })
}

const UpdateUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)

    res.json({
        success: true,
        message: "Updated",
    })
}

const DeleteUser = async (req, res) => {

    const { id } = req.params
    const user = await User.findById(id)
    await user.deleteOne(user)

    res.json({
        success: true,
        message: "Deleted"
    })
}

export {
    NewUser,
    GetAllUsers,
    FindUserByUserID,
    UpdateUser,
    DeleteUser
}