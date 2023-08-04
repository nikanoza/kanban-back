import { createColumn, deleteColumn } from "controllers";
import express from "express";

const columnRouter = express.Router();

columnRouter.post("/columns", createColumn);
columnRouter.delete("/columns/:columnId", deleteColumn);

export default columnRouter;
