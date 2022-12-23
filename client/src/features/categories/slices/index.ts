import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/index';

interface categoryState {
    idToUpdate: string;
    titleToUpdate: string;
    idToDelete: string;
    searchValue: string;
}

const initialState: categoryState = {
    idToUpdate: '',
    titleToUpdate: '',
    idToDelete: '',
    searchValue: '',
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setIdToUpdate(state, action: PayloadAction<string>) {
            state.idToUpdate = action.payload;
        },
        setTitleToUpdate(state, action: PayloadAction<string>) {
            state.titleToUpdate = action.payload;
        },
        setIdToDelete(state, action: PayloadAction<string>) {
            state.idToDelete = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
    },
});

export const {
    setIdToUpdate,
    setTitleToUpdate,
    setIdToDelete,
    setSearchValue,
} = categorySlice.actions;
export const category = (state: RootState) => state.category;

export default categorySlice.reducer;
