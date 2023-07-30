import { Schema, model } from "mongoose";
import { SubtaskType } from "types";
import { v4 as uuidv4 } from "uuid";

const { String, Boolean } = Schema.Types;

const subtaskSchema = new Schema<SubtaskType>({
  id: { type: String, default: uuidv4, unique: true },
  title: { type: String, required: true },
  active: { type: Boolean, required: true },
});

const Subtask = model("Subtask", subtaskSchema);

export default Subtask;
