import { createTask, deleteTask, updateTask } from "controllers";
import express from "express";

const taskRouter = express.Router();

taskRouter.post("/tasks", createTask);
taskRouter.delete("/tasks/:taskId", deleteTask);
taskRouter.put("/tasks/:taskId", updateTask);

export default taskRouter;
