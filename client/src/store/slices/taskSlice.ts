import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface taskState {
    idToUpdate: string;
    dataToUpdate: {
        title: string;
        deadline: string;
        category: string | null;
        priority: string | null;
    };
    idToDelete: string;
}

const initialState: taskState = {
    idToUpdate: '',
    dataToUpdate: {
        title: '',
        deadline: '',
        category: '',
        priority: '',
    },
    idToDelete: '',
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setIdToUpdate(state, action: PayloadAction<string>) {
            state.idToUpdate = action.payload;
        },
        setDataToUpdate(
            state,
            action: PayloadAction<{
                title: string;
                deadline: string;
                category: string | null;
                priority: string | null;
            }>,
        ) {
            state.dataToUpdate = action.payload;
        },
        setIdToDelete(state, action: PayloadAction<string>) {
            state.idToDelete = action.payload;
        },
    },
});

export const { setIdToUpdate, setDataToUpdate, setIdToDelete } =
    taskSlice.actions;

export const task = (state: RootState) => state.task;

export default taskSlice.reducer;
