import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { String, ObjectId } = Schema.Types;

const columnSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  title: String,
  tasks: [{ type: ObjectId, ref: "Task" }],
});

const Column = model("Column", columnSchema);

export default Column;
