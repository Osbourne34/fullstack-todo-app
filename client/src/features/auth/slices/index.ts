import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../store';

import { User } from '../../../types/User';

interface AuthState {
    user: User | null;
    token: string;
}

const initialState: AuthState = {
    user: null,
    token: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(
            state,
            action: PayloadAction<{ user: User | null; token: string }>
        ) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            state.user = null;
            state.token = '';
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export const auth = (state: RootState) => state.auth;
