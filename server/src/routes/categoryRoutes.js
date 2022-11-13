import { Router } from 'express';
export const categoryRoutes = new Router();

import {
    create,
    getAllCategories,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryControllers.js';
import { authCheck } from '../middlewares/authCheck.js';

categoryRoutes.get('/categories', authCheck, getAllCategories);
categoryRoutes.post('/category', authCheck, create);
categoryRoutes.patch('/category/:id', authCheck, updateCategory);
categoryRoutes.delete('/category/:id', authCheck, deleteCategory);
