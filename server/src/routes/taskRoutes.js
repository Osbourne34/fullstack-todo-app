import { Router } from 'express';
export const taskRoutes = new Router();

import { create, getAll, update } from '../controllers/taskControllers.js';
import { authCheck } from '../middlewares/authCheck.js';

taskRoutes.get('/tasks', authCheck, getAll);
taskRoutes.post('/task', authCheck, create);
taskRoutes.patch('/task/:id', authCheck, update);
