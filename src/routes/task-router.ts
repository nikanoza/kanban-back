import { createTask } from "controllers";
import express from "express";

const taskRouter = express.Router();

taskRouter.post("/tasks", createTask);

export default taskRouter;
