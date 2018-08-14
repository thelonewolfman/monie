import express from "express";
// import cors from "cors";

// import "./passport";

import apiRouter from "../api";
import { errorHandler } from "./error";

const app = express();

// app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  next();
});
app.use("/api", apiRouter);
app.use(errorHandler);

export default app;
