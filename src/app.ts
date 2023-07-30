import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connect from "./config/mongo.js";
import bodyParser from "body-parser";

dotenv.config();
connect();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3000);
