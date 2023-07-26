import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { String, Boolean } = Schema.Types;

const subtaskSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  title: String,
  active: Boolean,
});

const Subtask = model("Subtask", subtaskSchema);

export default Subtask;
