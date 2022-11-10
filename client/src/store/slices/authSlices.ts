import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

import { User } from '../../types/User';

interface AuthState {
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthState>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    },
});

export const { setAuth } = authSlice.actions;
export const auth = (state: RootState) => state.auth;

export default authSlice.reducer;
