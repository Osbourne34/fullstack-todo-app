import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/AuthApi';
import { categoriesApi } from './api/CategoriesApi';
import authReducer from './slices/authSlices';
import uiReducer from './slices/uiSlices';
import categorySearchReducer from './slices/categotySearch';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        auth: authReducer,
        ui: uiReducer,
        categorySearch: categorySearchReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            categoriesApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
