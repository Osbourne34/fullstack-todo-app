import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { auth } from '../../store/slices/authSlice';
import {
    task,
    setSearchValue,
    setCompleted,
    setPriority,
    clearFilter,
} from '../../store/slices/taskSlice';
import { useGetAllPrioritiesQuery } from '../../store/api/PriorityApi';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const TasksFilter = () => {
    const dispatch = useAppDispatch();
    const { token } = useAppSelector(auth);
    const { searchValue, completed, priority } = useAppSelector(task);
    const { data } = useGetAllPrioritiesQuery(token);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
                value={searchValue}
                label="Поиск в текущей категорий"
                variant="standard"
                fullWidth
                sx={{ width: '250px' }}
            />
            <FormControl
                variant="standard"
                fullWidth
                sx={{ width: '250px', mx: 4 }}
            >
                <InputLabel>Фильтр по статусу</InputLabel>
                <Select
                    onChange={(e) => dispatch(setCompleted(e.target.value))}
                    value={completed}
                >
                    <MenuItem value={'true'}>Завершенные</MenuItem>
                    <MenuItem value={'false'}>Незавершенные</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="standard" fullWidth sx={{ width: '250px' }}>
                <InputLabel>Фильтр по приоритетам</InputLabel>
                <Select
                    onChange={(e) => dispatch(setPriority(e.target.value))}
                    value={priority}
                >
                    {data?.map(({ _id, title }) => (
                        <MenuItem key={_id} value={_id}>
                            {title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {(searchValue || completed || priority) && (
                <Button onClick={() => dispatch(clearFilter())} sx={{ ml: 2 }}>
                    Сбросить фильтры
                </Button>
            )}
        </Box>
    );
};
