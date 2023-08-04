import { Request, Response } from "express";
import { Board, Column } from "models";
import { createColumnSchema } from "schemas";

export const createColumn = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const validator = await createColumnSchema(body);

    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(401).json(error.details);
    }

    const { title, boardId } = value;

    const board = await Board.findOne({ id: boardId });
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const column = new Column({
      title,
      tasks: [],
    });
    await column.save();

    board.columns.push(column._id);
    await board.save();

    return res.status(201).json(board);
  } catch (error) {
    return res.status(401).json(error);
  }
};
