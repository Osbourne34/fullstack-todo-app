import { configureStore } from '@reduxjs/toolkit';
import { emptySplitApi } from './api';
import { authSlice } from '../features/auth';
import { categorySlice } from '../features/categories';
import uiReducer from './slices/uiSlice';
import priorityReducer from './slices/prioritySlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
    reducer: {
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
        auth: authSlice.reducer,
        category: categorySlice.reducer,
        priority: priorityReducer,
        task: taskReducer,
        ui: uiReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(emptySplitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
