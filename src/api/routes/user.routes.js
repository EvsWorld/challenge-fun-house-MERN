import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as jwtMiddlware from '../middlewares/jwtMiddlware.js';

const router = Router();

router.put('/own', jwtMiddlware.verifyToken, userController.update);
router.get('/own', jwtMiddlware.verifyToken, userController.info);

export default router;
