import Joi, { CustomHelpers } from "joi";
import { Column } from "models";
import { ColumnType, NewTask } from "types";

const determineIfColumnExists =
  (board: ColumnType | null) => (value: string, helpers: CustomHelpers) => {
    if (!board) {
      return helpers.error("any.invalid");
    }

    return value;
  };

const addTaskSchema = async (data: NewTask) => {
  const column = await Column.findOne({ id: data.columnId });

  return Joi.object<NewTask>({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    columnId: Joi.string().custom(determineIfColumnExists(column)).required(),
    subtasks: Joi.array()
      .items(Joi.string().required().trim())
      .min(1)
      .required(),
  });
};
export default addTaskSchema;
