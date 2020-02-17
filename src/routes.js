import { Router } from 'express';

import UserController from './App/Controllers/UserController';
import SessionController from './App/Controllers/SessionController';

import authMiddleware from './App/middlewares/auth';

const router = new Router();

router.post('/users', UserController.store);
router.post('/sessions', SessionController.store);

router.use(authMiddleware);
router.put('/users', UserController.update);

export default router;
