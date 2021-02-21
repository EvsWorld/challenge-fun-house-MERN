import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { checkForUsedUsernameOrEmail } from '../middlewares/jwtMiddlware';
const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;
