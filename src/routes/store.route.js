import { Router } from "express";
import {
  addToFevourite,
  getFevourite,
  getIndex,
  houseDetails,
  houseListAll,
  removeToFevourite,
} from "../controllers/store.controller.js";

const storeRouter = Router();

storeRouter.get("", getIndex);
storeRouter.get("/house-list", houseListAll);
storeRouter.get("/house-detail/:houseId", houseDetails );
storeRouter.get("/fevourite", getFevourite)
storeRouter.post("/fevourite", addToFevourite)
storeRouter.post("/fevourite/remove", removeToFevourite)

export default storeRouter;
