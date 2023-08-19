import {
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "controllers";
import express from "express";

const taskRouter = express.Router();

taskRouter.post("/tasks", createTask);
taskRouter.delete("/tasks/:taskId", deleteTask);
taskRouter.put("/tasks/:taskId", updateTask);
taskRouter.put("/tasks/status/:taskId", updateTaskStatus);

export default taskRouter;
