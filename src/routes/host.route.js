import { Router } from "express";
import { addHome, addSucces, deleteHostHome, getEditHostHome, getHostHomeList, updateHostHome } from "../controllers/host.controller.js";

const hostRouter = Router();

hostRouter.get("/home/list", getHostHomeList)
hostRouter.get("/home/edit/:homeId", getEditHostHome)
hostRouter.post("/home/edit-success", updateHostHome)

hostRouter.get("/home/add", addHome);
hostRouter.post("/home/add-success", addSucces);
hostRouter.post("/home/delete", deleteHostHome)

export default hostRouter;
