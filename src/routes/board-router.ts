import { createBoard } from "controllers";
import express from "express";

const boardRouter = express.Router();

boardRouter.post("/board", createBoard);

export default boardRouter;
