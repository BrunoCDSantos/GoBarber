import { Router } from 'express';

import UserController from './App/Controllers/UserController';
import SessionController from './App/Controllers/SessionController';

const router = new Router();

router.post('/users', UserController.store);
router.post('/users', SessionController.store);

export default router;
