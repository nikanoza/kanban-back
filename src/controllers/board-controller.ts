import { Request, Response } from "express";
import { Board, Column, Subtask, Task } from "models";
import { createBoardSchema, updateBoardSchema } from "schemas";

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

    newBoard.columns = newColumns;
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

    return res.json({
      message: "Board and associated data deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const validator = await updateBoardSchema({ title, id });

    const { error } = validator.validate({ title, id });

    if (error) {
      return res.status(401).json(error.details);
    }

    const boardToUpdate = await Board.findOne({ id });

    if (!boardToUpdate) {
      return res.status(404).json({ message: "Board not found" });
    }

    boardToUpdate.title = title;
    await boardToUpdate.save();

    return res.status(200).json(boardToUpdate);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllBoards = async (_: Request, res: Response) => {
  try {
    const boards = await Board.find({})
      .select("-_id -__v")
      .populate("columns")
      .populate({
        path: "columns",
        populate: {
          path: "tasks",
          populate: {
            path: "subtasks",
            select: "-_id -__v",
          },
          select: "-_id -__v",
        },
        select: "-_id -__v",
      })
      .exec();

    return res.status(200).json(boards);
  } catch (error) {
    return res.status(500).json(error);
  }
};
