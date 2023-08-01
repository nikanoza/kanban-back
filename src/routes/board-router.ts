import { createBoard, deleteBoard, updateBoard } from "controllers";
import express from "express";

const boardRouter = express.Router();

boardRouter.post("/boards", createBoard);
boardRouter.delete("/boards/:id", deleteBoard);
boardRouter.put("/boards/:id", updateBoard);

export default boardRouter;
