import { Schema, model, Types } from "mongoose";
import { ColumnType } from "types";
import { v4 as uuidv4 } from "uuid";

const { String } = Schema.Types;

const columnSchema = new Schema<ColumnType>({
  id: { type: String, default: uuidv4, unique: true, required: true },
  title: { type: String, required: true },
  tasks: [{ type: Types.ObjectId, ref: "Task" }],
});

const Column = model("Column", columnSchema);

export default Column;
