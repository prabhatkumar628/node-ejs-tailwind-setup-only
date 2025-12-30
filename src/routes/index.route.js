import { Router } from "express";
import storeRouter from "./store.route.js";
import hostRouter from "./host.route.js";

const router = Router();

router.use("/",storeRouter)
router.use("/host",hostRouter)

export default router;
