import { ApiError } from "../middlewares/apiError.js";
import { Task } from "../models/task.model.js";

export const newTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(title, description);

    if (!title || !description) {
      res.status(400).json({
        success: false,
        message: "Title and Description is required",
      })
    }
    else {
      await Task.create({
        title,
        description,
        user: req.user,
      });

      res.status(201).json({
        success: true,
        message: "Task added successfully",
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while saving the task",
    });
  }
};

export const GetAllTask = async (req, res) => {
  try {
    const userid = req.user._id
    if (!userid) {
      res.status(400).json({
        success: false,
        message: "Please login first"
      })
    }
    else {
      const tasks = await Task.find({ user: userid })
      res.status(200).json({
        success: true,
        tasks
      })
    }
  } catch (error) {
    res.json({
      message: "something went wrong while fetching the tasks"
    })
  }
}

export const updateTask = async (req, res) => {
  
  try {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) {
      res.status(404).json({
        success: false,
        message: " task not found"
      })
    }
    task.isCompeleted = !task.isCompeleted
    await task.save()

    res.status(200).json({
      success: true,
      message: "Task updated successfully"
    })
  } catch (error) {
    res.json({
      message: "something went wrong while fetching the task"
    })
  }

}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) {
      res.status(404).json({
        success: false,
        message: " task not found"
      })
    }
    await task.deleteOne()
    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    })
  } catch (error) {
    res.json({
      message: "something went wrong while deleting the task"
    })
  }
}


//   another method to save data in database

//   const task = new Task({title, description})
//   task.save()
