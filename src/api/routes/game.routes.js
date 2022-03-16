import { Router } from "express";
import * as gameController from "../controllers/game.controller";

const router = Router();

router.get("/", gameController.findByMonth);

export default router;
