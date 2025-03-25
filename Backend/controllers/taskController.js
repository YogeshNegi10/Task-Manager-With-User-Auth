import { Todo } from "../modals/taskModal.js";
import ErrorHandler from "../utils/error.js";

// Function to Add New Task or Todo..

export const addTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description)
      return next(new ErrorHandler("All fields are required.", 404));

    await Todo.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json({
      sucess: true,
      message: "task Created successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Fuction for To Get my All task or Todo..

export const getMyTask = async (req, res, next) => {
  try {
    const { id } = req.user;

    const tasks = await Todo.find({ user: id });

    res.status(200).json({
      message: "Your Task!",
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// Function To marks My Task or Todo..

export const markTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Todo.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Id!", 404));

    task.iscompleted = !task.iscompleted;

    await task.save();

    res.status(200).json({
      sucess: true,
      message: "Task Updated successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    if (!title || !description)
      return next(new ErrorHandler("All fields are required.", 404));
    const task = await Todo.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Id!", 404));

    task.title = title;
    task.description = description;

    await task.save();

    res.status(200).json({
      sucess: true,
      message: "Task Updated successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Function To Delete My Task or Todo..

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Todo.findById(id);

    if (!task) return next(new ErrorHandler("Invalid Id!", 404));

    await task.deleteOne();

    res.status(200).json({
      sucess: true,
      message: "Task Deleted successfully!.",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAllTask = async (req, res, next) => {
  try {
    await Todo.deleteMany();

    res.status(200).json({
      sucess: true,
      message: "Deleted successfully!.",
    });
  } catch (error) {
    next(error);
  }
};
