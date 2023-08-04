import { createColumn, deleteColumn, updateColumn } from "controllers";
import express from "express";

const columnRouter = express.Router();

columnRouter.post("/columns", createColumn);
columnRouter.delete("/columns/:columnId", deleteColumn);
columnRouter.put("/columns/:columnId", updateColumn);

export default columnRouter;
