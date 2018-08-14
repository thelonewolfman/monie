import { Router } from "express";

import accountRouter from "./account/routers";

const router = Router();

router.use(accountRouter);

export default router;
