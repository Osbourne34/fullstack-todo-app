import { Router } from 'express';
export const taskRoutes = new Router();

import { create, getAll } from '../controllers/taskControllers.js';
import { authCheck } from '../middlewares/authCheck.js';

taskRoutes.get('/todos', authCheck, getAll);
taskRoutes.post('/todos', authCheck, create);
