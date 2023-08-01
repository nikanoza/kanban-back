import {
  createBoard,
  deleteBoard,
  getAllBoards,
  updateBoard,
} from "controllers";
import express from "express";

const boardRouter = express.Router();

boardRouter.post("/boards", createBoard);
boardRouter.get("/boards", getAllBoards);
boardRouter.delete("/boards/:id", deleteBoard);
boardRouter.put("/boards/:id", updateBoard);

export default boardRouter;
