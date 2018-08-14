import { Router } from "express";

import { journalTypeController } from "../controllers";

const router = Router();

const {
  readAll,
  createOne,
  readOne,
  updateOne,
  deleteOne
} = journalTypeController;

router
  .route("/journal-types")
  .get([readAll])
  .post([createOne]);

router
  .route("/journal-types/:id")
  .get(readOne)
  .put(updateOne)
  .delete(deleteOne);

export default router;
