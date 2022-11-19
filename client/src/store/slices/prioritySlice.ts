import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface priorityState {
    idToUpdateTitle: string;
    titleToUpdate: string;
    idToDelete: string;
}

const initialState: priorityState = {
    idToUpdateTitle: '',
    titleToUpdate: '',
    idToDelete: '',
};

export const prioritySlice = createSlice({
    name: 'priority',
    initialState,
    reducers: {
        setIdToUpdateTitle(state, action: PayloadAction<string>) {
            state.idToUpdateTitle = action.payload;
        },
        setTitleToUpdate(state, action: PayloadAction<string>) {
            state.titleToUpdate = action.payload;
        },

        setIdToDelete(state, action: PayloadAction<string>) {
            state.idToDelete = action.payload;
        },
    },
});

export const { setIdToUpdateTitle, setTitleToUpdate, setIdToDelete } =
    prioritySlice.actions;

export const priority = (state: RootState) => state.priority;

export default prioritySlice.reducer;
