import { Request, Response } from "express";
import { Column, Subtask, Task } from "models";
import { addTaskSchema } from "schemas";

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
