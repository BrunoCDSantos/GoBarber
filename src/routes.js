import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './App/Controllers/UserController';
import SessionController from './App/Controllers/SessionController';
import FileController from './App/Controllers/FileController';
import Provider from './App/Controllers/ProviderController';

import authMiddleware from './App/middlewares/auth';
import AppointmentController from './App/Controllers/AppointmentController';

const router = new Router();
const upload = multer(multerConfig);

router.post('/users', UserController.store);
router.post('/sessions', SessionController.store);

router.use(authMiddleware);
router.put('/users', UserController.update);

router.post('users', UserController.update);

router.get('/providers', Provider.index);

router.post('/appointments', AppointmentController.store);

router.post('/files', upload.single('file'), FileController.store);

export default router;
