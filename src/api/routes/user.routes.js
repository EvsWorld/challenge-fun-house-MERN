import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.post('/', userController.create);
router.put('/:id', userController.update);

export default router;
