import { Request, Response } from "express";
import { Board, Column, Subtask, Task } from "models";
import { createBoardSchema } from "schemas";

export const createBoard = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const validator = await createBoardSchema(body);

    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(401).json(error.details);
    }

    const { title, columns } = value;

    const newBoard = new Board({
      title,
    });

    const newColumns = [];

    for (let i = 0; i < columns.length; i++) {
      const column = new Column({
        title: columns[i],
        tasks: [],
      });

      await column.save();

      newColumns.push(column._id);
    }

    newBoard.columns = columns;
    await newBoard.save();

    return res.status(201).json(newBoard);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  const boardId = req.params.id;

  try {
    const board = await Board.findOne({ id: boardId });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const columns = await Column.find({ _id: { $in: board.columns } });

    const tasks = await Task.find({
      _id: { $in: columns.map((col) => col.tasks).flat() },
    });

    const subtasks = await Subtask.find({
      _id: { $in: tasks.map((task) => task.subtasks).flat() },
    });

    await Promise.all([
      Task.deleteMany({ _id: { $in: tasks.map((task) => task._id) } }),
      Subtask.deleteMany({
        _id: { $in: subtasks.map((subtask) => subtask._id) },
      }),
      Column.deleteMany({ _id: { $in: columns.map((col) => col._id) } }),
      board.deleteOne(),
    ]);

    res.json({ message: "Board and associated data deleted successfully." });
  } catch (error) {
    res.status(500).json(error);
  }
};
