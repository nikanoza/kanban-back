import { Request, Response } from "express";
import { Board, Column } from "models";
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
