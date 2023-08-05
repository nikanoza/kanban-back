import { createSubtask, deleteSubtask, updateSubtask } from "controllers";
import express from "express";

const subtaskRouter = express.Router();

subtaskRouter.post("/subtasks", createSubtask);
subtaskRouter.delete("/subtasks/:subtaskId", deleteSubtask);
subtaskRouter.put("/subtasks/:subtaskId", updateSubtask);

export default subtaskRouter;
