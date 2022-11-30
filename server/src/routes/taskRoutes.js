import { Router } from 'express';
export const taskRoutes = new Router();

import {
    create,
    getAll,
    getInCompletedTasks,
    taskStatistics,
    update,
    switchTaskExecution,
    remove,
} from '../controllers/taskControllers.js';
import { authCheck } from '../middlewares/authCheck.js';

taskRoutes.get('/tasks', authCheck, getAll);
taskRoutes.get('/inCompletedTasks', authCheck, getInCompletedTasks);
taskRoutes.get('/taskStatistics', authCheck, taskStatistics);
taskRoutes.post('/task', authCheck, create);
taskRoutes.patch('/task/:id', authCheck, update);
taskRoutes.patch('/switchTaskExecution/:id', authCheck, switchTaskExecution);
taskRoutes.delete('/task/:id', authCheck, remove);
