
import { Router } from 'express';
import * as controller from '../controllers/company.controller'
const router = Router();

router.get('/', controller.findAll);

export default router;