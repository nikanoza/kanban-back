import Joi, { CustomHelpers } from "joi";
import { Board } from "models";
import { BoardType } from "types";

type NewColumn = {
  boardId: string;
  title: string;
};

const determineIfBoardExists =
  (board: BoardType | null) => (value: string, helpers: CustomHelpers) => {
    if (!board) {
      return helpers.error("any.invalid");
    }

    return value;
  };

const createColumnSchema = async (data: NewColumn) => {
  const board = await Board.findOne({ id: data.boardId });

  return Joi.object({
    boardId: Joi.string().custom(determineIfBoardExists(board)).required(),
    title: Joi.string().required().trim(),
  });
};
export default createColumnSchema;
