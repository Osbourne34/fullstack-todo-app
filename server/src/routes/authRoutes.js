import { Router } from 'express';
export const authRoutes = new Router();

import { register, login, me } from '../controllers/authControllers.js';
import { authCheck } from '../middlewares/authCheck.js';

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/me', authCheck, me);
