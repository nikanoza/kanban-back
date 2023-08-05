import Joi, { CustomHelpers } from "joi";
import { Column } from "models";
import { ColumnType } from "types";

type EditColumn = {
  columnId: string;
  title: string;
};

const determineIfColumnExists =
  (column: ColumnType | null) => (value: string, helpers: CustomHelpers) => {
    if (!column) {
      return helpers.error("any.invalid");
    }

    return value;
  };

const updateColumnSchema = async (data: EditColumn) => {
  const column = await Column.findOne({ id: data.columnId });

  return Joi.object<EditColumn>({
    columnId: Joi.string().custom(determineIfColumnExists(column)).required(),
    title: Joi.string().required().trim(),
  });
};
export default updateColumnSchema;
