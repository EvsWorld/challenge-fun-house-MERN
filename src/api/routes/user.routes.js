import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as jwtMiddlware from '../middlewares/jwtMiddlware.js';

const router = Router();

router.post('/', userController.create);
router.put('/:id', userController.update);
router.get('/info', jwtMiddlware.verifyToken, userController.info);

export default router;
