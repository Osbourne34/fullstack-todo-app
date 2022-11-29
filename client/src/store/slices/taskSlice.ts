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
    page: number;
    limit: number;
    searchValue: string;
    completed: string;
    priority: string;
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
    page: 0,
    limit: 5,
    searchValue: '',
    completed: '',
    priority: '',
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
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCompleted(state, action: PayloadAction<string>) {
            state.completed = action.payload;
        },
        setPriority(state, action: PayloadAction<string>) {
            state.priority = action.payload;
        },
        clearFilter(state) {
            state.searchValue = '';
            state.completed = '';
            state.priority = '';
        },
    },
});

export const {
    setIdToUpdate,
    setDataToUpdate,
    setIdToDelete,
    setPage,
    setLimit,
    setSearchValue,
    setCompleted,
    setPriority,
    clearFilter,
} = taskSlice.actions;

export const task = (state: RootState) => state.task;

export default taskSlice.reducer;
