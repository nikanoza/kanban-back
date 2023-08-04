import { Request, Response } from "express";
import { Board, Column } from "models";
import { createColumnSchema, updateColumnSchema } from "schemas";

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

    return res.status(201).json(column.id);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const deleteColumn = async (req: Request, res: Response) => {
  try {
    const id = req.params.columnId;
    const { boardId } = req.body;

    const column = await Column.findOne({ id });
    if (!column) {
      return res.status(404).json({ message: "Column not found" });
    }
    const board = await Board.findOne({ id: boardId });
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const index = board.columns.findIndex((col) => column._id.equals(col));
    board.columns.splice(1, index);

    await column.deleteOne();
    await board.save();

    return res.json({
      message: "column deleted successfully.",
    });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const updateColumn = async (req: Request, res: Response) => {
  try {
    const id = req.params.columnId;
    const { title } = req.body;

    const validator = await updateColumnSchema({ title, columnId: id });

    const { error } = validator.validate({ title, columnId: id });

    if (error) {
      return res.status(401).json(error.details);
    }

    await Column.findOneAndUpdate({ id }, { title });

    return res.status(204).json({ message: "column updated" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
