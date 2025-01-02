import { Router } from 'express';
import AuthController from '../controllers/authControl';

const router = Router();




router.post('/login', AuthController.loginHandler);


router.post('/register', AuthController.registerHandler);

export default router;