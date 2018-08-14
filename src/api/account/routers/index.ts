import { Router } from "express";

import accountRouter from "./account";
import journalTypeRouter from "./journal-type";
import journalRouter from "./journal";

const router = Router();

router.use("/account", accountRouter);
router.use("/account", journalTypeRouter);
router.use("/account", journalRouter);

export default router;
