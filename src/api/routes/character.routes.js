import { Router } from 'express';
import * as charactersController from '../controllers/character.controller';
import * as jwtMiddlware from '../middlewares/jwtMiddlware.js';

const router = Router();

router.get('/', jwtMiddlware.verifyToken, charactersController.findAll);

export default router;
