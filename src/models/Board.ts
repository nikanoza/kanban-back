import { Schema, model, Types } from "mongoose";
import { BoardType } from "types";
import { v4 as uuidv4 } from "uuid";

const { String } = Schema.Types;

const boardSchema = new Schema<BoardType>({
  id: { type: String, default: uuidv4, unique: true, required: true },
  title: { type: String, required: true },
  columns: [{ type: Types.ObjectId, ref: "Column" }],
});

const Board = model("Board", boardSchema);

export default Board;
