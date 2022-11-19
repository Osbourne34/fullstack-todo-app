import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { category, setSearchValue } from '../../../store/slices/categorySlice';

import TextField from '@mui/material/TextField';

export const SearchCategory = () => {
    const { searchValue } = useAppSelector(category);
    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(event.target.value));
    };

    return (
        <TextField
            value={searchValue}
            onChange={handleChange}
            variant="standard"
            label="Поиск по категорий"
            fullWidth
        />
    );
};
