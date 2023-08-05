import { createSubtask, deleteSubtask } from "controllers";
import express from "express";

const subtaskRouter = express.Router();

subtaskRouter.post("/subtasks", createSubtask);
subtaskRouter.delete("/subtasks/:subtaskId", deleteSubtask);

export default subtaskRouter;
