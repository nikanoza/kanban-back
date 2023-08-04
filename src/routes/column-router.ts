import { createColumn } from "controllers";
import express from "express";

const columnRouter = express.Router();

columnRouter.post("/columns", createColumn);

export default columnRouter;
