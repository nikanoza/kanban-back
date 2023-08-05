import { createTask, deleteTask } from "controllers";
import express from "express";

const taskRouter = express.Router();

taskRouter.post("/tasks", createTask);
taskRouter.delete("/tasks/:taskId", deleteTask);

export default taskRouter;
