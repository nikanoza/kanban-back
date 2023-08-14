import { Schema, model } from "mongoose";
import { TaskType } from "types";
import { v4 as uuidv4 } from "uuid";

const { String, ObjectId } = Schema.Types;

const taskSchema = new Schema<TaskType>({
  id: { type: String, default: uuidv4, unique: true, require: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  subtasks: [{ type: ObjectId, ref: "Subtask" }],
});

const Task = model("Task", taskSchema);

export default Task;
