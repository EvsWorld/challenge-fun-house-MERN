import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as jwtMiddlware from '../middlewares/jwtMiddlware.js';

const router = Router();

router.post('/', userController.create);
router.put('/:id', userController.update); // TODO: put back jwtMiddlware: jwtMiddlware.verifyToken
router.get('/:id', userController.info); // TODO: put back jwtMiddlware: jwtMiddlware.verifyToken

export default router;
