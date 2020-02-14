import { Router } from 'express';

import UserController from './App/Controllers/UserController';

const router = new Router();

router.post('/users', UserController.store);

export default router;
