import ErrorHandler, { ApiError } from "../middlewares/apiError.js";
import { Task } from "../models/task.model.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    console.log(title, description);

    if (!title || !description) {
      return next(new ErrorHandler(400, "Title and Description is required"));
    } else {
      await Task.create({
        title,
        description,
        user: req.user,
      });

      res.status(201).json({
        success: true,
        message: "Task added successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const GetAllTask = async (req, res, next) => {
  try {
    const userid = req.user._id;
    if (!userid) {
      return next(new ErrorHandler(404, "User not found please login"));
    } else {
      const tasks = await Task.find({ user: userid });
      res.status(200).json({
        success: true,
        tasks,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new ErrorHandler(404, "Task not found"));
    }
    task.isCompeleted = !task.isCompeleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new ErrorHandler(404, "Task not found"));
    }
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//   another method to save data in database

//   const task = new Task({title, description})
//   task.save()
