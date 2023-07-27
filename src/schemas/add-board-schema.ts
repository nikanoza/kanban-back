import Joi from "joi";
import { NewBoardType } from "types";

const createBoardSchema = async (_: NewBoardType) => {
  return Joi.object({
    title: Joi.string().required().trim(),
    columns: Joi.array().items(Joi.string().required().trim()).min(1),
  });
};
export default createBoardSchema;
