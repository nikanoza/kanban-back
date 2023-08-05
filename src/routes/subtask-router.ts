import { createSubtask } from "controllers";
import express from "express";

const subtaskRouter = express.Router();

subtaskRouter.post("/subtasks", createSubtask);

export default subtaskRouter;
