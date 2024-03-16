import express from "express";
import {
    GetAllTask,
    deleteTask,
    newTask,
    updateTask,
} from "../controller/task.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/gettask", isAuthenticated, GetAllTask);
router.route("/:id")
    .put(isAuthenticated, updateTask)
    .delete(isAuthenticated, deleteTask);

export default router;
