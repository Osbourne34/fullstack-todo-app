import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
    searchValue,
    setSearchValue,
} from '../../../store/slices/categotySearch';

import TextField from '@mui/material/TextField';

export const SearchCategory = () => {
    const { value } = useAppSelector(searchValue);
    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(event.target.value));
    };

    return (
        <TextField
            value={value}
            onChange={handleChange}
            variant="standard"
            label="Поиск по категорий"
            fullWidth
        />
    );
};
