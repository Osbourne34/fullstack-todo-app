import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/AuthApi';
import authReducer from './slices/authSlices';
import uiReducer from './slices/uiSlices';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        ui: uiReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
