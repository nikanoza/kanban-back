import { Request, Response } from "express";
import { Column, Subtask, Task } from "models";
import { addTaskSchema } from "schemas";
import updateTaskSchema from "schemas/update-task-schema";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const validator = await addTaskSchema(body);
    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(401).json(error.details);
    }

    const { title, description, subtasks, columnId } = value;

    const newTask = new Task({
      title,
      description,
    });

    const subtasksArray = [];

    for (let i = 0; i < subtasks.length; i++) {
      const newSubtask = new Subtask({
        title: subtasks[i],
        active: false,
      });

      await newSubtask.save();
      subtasksArray.push(newSubtask._id);
    }

    newTask.subtasks = subtasksArray;

    newTask.save();

    const column = await Column.findOne({ id: columnId });
    if (!column) {
      return res.status(404).json({ message: "Column not found" });
    }

    column.tasks.push(newTask._id);
    await column.save();
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const { columnId } = req.body;

    const task = await Task.findOne({ id: taskId });
    const column = await Column.findOne({ id: columnId });
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    if (!column) {
      return res.status(404).json({ message: "column not found" });
    }

    const subtasks = await Subtask.find({ _id: { $in: task.subtasks } });

    await Promise.all([
      Subtask.deleteMany({
        _id: { $in: subtasks.map((subtask) => subtask._id) },
      }),
      task.deleteOne(),
    ]);

    const index = column.tasks.findIndex((item) => task._id.equals(item));
    column.tasks.splice(1, index);
    column.save();
    return res.json({
      message: "Task and associated data deleted successfully.",
    });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const validator = await updateTaskSchema(body);

    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(401).json(error.details);
    }

    const { title, taskId } = value;

    await Task.findOneAndUpdate({ id: taskId }, { title });
    return res.status(204).json({ message: "task updated" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
