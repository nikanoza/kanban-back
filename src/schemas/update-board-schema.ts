import Joi, { CustomHelpers } from "joi";
import { Board } from "models";
import { BoardType, UpdateBoardType } from "types";

const determineIfBoardExists =
  (board: BoardType | null) => (value: string, helpers: CustomHelpers) => {
    if (!board) {
      return helpers.error("any.invalid");
    }

    return value;
  };

const updateBoardSchema = async (data: UpdateBoardType) => {
  const board = await Board.findOne({ id: data.id });
  return Joi.object({
    title: Joi.string().required().trim(),
    id: Joi.string().custom(determineIfBoardExists(board)).required(),
  });
};
export default updateBoardSchema;
