import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as jwtMiddlware from '../middlewares/jwtMiddlware.js';

const router = Router();

router.put('/own', jwtMiddlware.verifyToken, userController.update); // TODO: put back jwtMiddlware: jwtMiddlware.verifyToken
router.get('/own', jwtMiddlware.verifyToken, userController.info); // TODO: put back jwtMiddlware: jwtMiddlware.verifyToken

export default router;
