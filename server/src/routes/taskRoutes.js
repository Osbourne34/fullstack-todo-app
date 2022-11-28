import { Router } from 'express';
export const taskRoutes = new Router();

import {
    create,
    getAll,
    getInCompletedTasks,
    update,
    remove,
} from '../controllers/taskControllers.js';
import { authCheck } from '../middlewares/authCheck.js';

taskRoutes.get('/tasks', authCheck, getAll);
taskRoutes.get('/inCompletedTasks', authCheck, getInCompletedTasks);
taskRoutes.post('/task', authCheck, create);
taskRoutes.patch('/task/:id', authCheck, update);
taskRoutes.delete('/task/:id', authCheck, remove);
