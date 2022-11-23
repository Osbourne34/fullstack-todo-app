import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/AuthApi';
import { categoriesApi } from './api/CategoriesApi';
import { priorityApi } from './api/PriorityApi';
import { taskApi } from './api/TaskApi';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import categoryReducer from './slices/categorySlice';
import priorityReducer from './slices/prioritySlice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [priorityApi.reducerPath]: priorityApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
        auth: authReducer,
        ui: uiReducer,
        category: categoryReducer,
        priority: priorityReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            categoriesApi.middleware,
            priorityApi.middleware,
            taskApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
