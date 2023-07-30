import { createBoard } from "controllers";
import express from "express";

const boardRouter = express.Router();

boardRouter.post("/boards", createBoard);

export default boardRouter;
