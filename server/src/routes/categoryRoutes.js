import { Router } from 'express';
export const categoryRoutes = new Router();

import {
    create,
    getAll,
    update,
    remove,
} from '../controllers/categoryControllers.js';
import { authCheck } from '../middlewares/authCheck.js';

categoryRoutes.get('/categories', authCheck, getAll);
categoryRoutes.post('/category', authCheck, create);
categoryRoutes.patch('/category/:id', authCheck, update);
categoryRoutes.delete('/category/:id', authCheck, remove);
