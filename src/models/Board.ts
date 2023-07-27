import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { String, ObjectId } = Schema.Types;

const boardSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true, required: true },
  title: { type: String, required: true },
  columns: [{ type: ObjectId, ref: "Column" }],
});

const Board = model("Board", boardSchema);

export default Board;
