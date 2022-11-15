import { Router } from 'express';
export const priorityRoutes = new Router();

import {
    create,
    getAll,
    update,
    remove,
} from '../controllers/priorityControllers.js';
import { authCheck } from '../middlewares/authCheck.js';

priorityRoutes.get('/priorities', authCheck, getAll);
priorityRoutes.post('/priority', authCheck, create);
priorityRoutes.patch('/priority/:id', authCheck, update);
priorityRoutes.delete('/priority/:id', authCheck, remove);
