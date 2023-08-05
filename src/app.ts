import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connect from "./config/mongo.js";
import bodyParser from "body-parser";
import { boardRouter, columnRouter, subtaskRouter, taskRouter } from "routes";
import { swagger } from "middlewares";

dotenv.config();
connect();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", boardRouter);
app.use("/api", columnRouter);
app.use("/api", taskRouter);
app.use("/api", subtaskRouter);
app.use("/", ...swagger);

app.listen(process.env.PORT || 3000);
