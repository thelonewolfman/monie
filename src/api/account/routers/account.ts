import { Router } from "express";

import { accountController } from "../controllers";

const router = Router();

const { readAll, createOne, readOne, updateOne, deleteOne } = accountController;

router
  .route("/accounts")
  .get([readAll])
  .post([createOne]);

router
  .route("/accounts/:id")
  .get(readOne)
  .put(updateOne)
  .delete(deleteOne);

export default router;
