import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface categorySearchState {
    value: string;
}

const initialState: categorySearchState = {
    value: '',
};

export const categorySearch = createSlice({
    name: 'categorySearch',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.value = action.payload;
        },
    },
});

export const { setSearchValue } = categorySearch.actions;
export const searchValue = (state: RootState) => state.categorySearch;

export default categorySearch.reducer;
