import React from 'react';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const TaskForm = () => {
    return (
        <form>
            <TextField
                variant="standard"
                label="Название задачи"
                autoFocus
                fullWidth
            />

            <FormControl variant="standard" fullWidth>
                <InputLabel>Укажите категорию</InputLabel>
                <Select>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth>
                <InputLabel>Укажите приоритет</InputLabel>
                <Select>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </form>
    );
};
