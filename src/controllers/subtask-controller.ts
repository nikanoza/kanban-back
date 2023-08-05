import { Request, Response } from "express";
import { Subtask, Task } from "models";

export const createSubtask = async (req: Request, res: Response) => {
  try {
    const { title, taskId } = req.body;

    const task = await Task.findOne({ id: taskId });
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    if (typeof title === "string" && title.trim().length > 0) {
      const newSubtask = new Subtask({
        title,
        active: false,
      });

      await newSubtask.save();
      task.subtasks.push(newSubtask._id);
      await task.save();
      return res.status(201).json(newSubtask.id);
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const deleteSubtask = async (req: Request, res: Response) => {
  try {
    const id = req.params.subtaskId;
    const { taskId } = req.body;

    const subtask = await Subtask.findOne({ id });
    if (!subtask) {
      return res.status(404).json({ message: "subtask not found" });
    }
    const task = await Task.findOne({ id: taskId });
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    const index = task.subtasks.findIndex((item) => subtask._id.equals(item));
    task.subtasks.splice(1, index);
    task.save();
    await subtask.deleteOne();
    return res.json({
      message: "subtask deleted successfully.",
    });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const updateSubtask = async (req: Request, res: Response) => {
  try {
    const id = req.params.subtaskId;
    const { title, active } = req.body;
    if (
      typeof title === "string" &&
      title.trim().length > 0 &&
      typeof active === "boolean"
    ) {
      const subtask = await Subtask.findOne({ id });
      if (!subtask) {
        return res.status(404).json({ message: "subtask not found" });
      }

      subtask.title = title;
      subtask.active = active;
      await subtask.save();
      return res.status(204).json({
        message: "subtask updated successfully.",
      });
    } else {
      return res.status(401).json({ message: "invalid data" });
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};
