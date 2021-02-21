import { Router } from 'express';
import * as charactersController from '../controllers/character.controller';
const router = Router();

router.get('/', charactersController.findAll);

export default router;
