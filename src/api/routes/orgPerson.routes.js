import { Router } from "express";
import * as orgPersonController from "../controllers/orgPerson.controller";

const router = Router();

router.get("/:name", orgPersonController.info);

export default router;
