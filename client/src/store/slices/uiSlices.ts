import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface uiState {
    isOpenDrawer: boolean;
}

const initialState: uiState = {
    isOpenDrawer: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsOpenDrawer(state) {
            state.isOpenDrawer = !state.isOpenDrawer;
        },
    },
});

export const { setIsOpenDrawer } = uiSlice.actions;
export const ui = (state: RootState) => state.ui;

export default uiSlice.reducer;
