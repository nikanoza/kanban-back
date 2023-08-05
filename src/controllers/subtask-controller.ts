import { Request, Response } from "express";
import { Subtask, Task } from "models";

export const createSubtask = async (req: Request, res: Response) => {
  try {
    const { title, taskId } = req.body;

    const task = await Task.findOne({ id: taskId });
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    if (typeof title === "string" && title.length > 0) {
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
