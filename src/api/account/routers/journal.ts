import { Router } from "express";

import { journalController } from "../controllers";

const router = Router();

const { readAll, createOne, readOne, updateOne, deleteOne } = journalController;

router
  .route("/journals")
  .get([readAll])
  .post([createOne]);

router
  .route("/journals/:id")
  .get(readOne)
  .put(updateOne)
  .delete(deleteOne);

export default router;
