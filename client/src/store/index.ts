import { configureStore } from '@reduxjs/toolkit';
import { emptySplitApi } from './api/api';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import categoryReducer from './slices/categorySlice';
import priorityReducer from './slices/prioritySlice';

export const store = configureStore({
    reducer: {
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
        auth: authReducer,
        ui: uiReducer,
        category: categoryReducer,
        priority: priorityReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(emptySplitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
