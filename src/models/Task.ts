import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { String, ObjectId } = Schema.Types;

const taskSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true },
  title: String,
  subtasks: [{ type: ObjectId, ref: "Subtasks" }],
});

const Task = model("Task", taskSchema);

export default Task;
