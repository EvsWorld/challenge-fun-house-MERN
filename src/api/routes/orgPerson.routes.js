import { Router } from "express";
import * as orgPersonController from "../controllers/orgPerson.controller";

const router = Router();

router.get("/:name", orgPersonController.info);
router.put("/", orgPersonController.update);

export default router;
