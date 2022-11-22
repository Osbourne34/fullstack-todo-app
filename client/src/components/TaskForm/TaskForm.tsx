import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';

interface TaskFormInputs {
    title: string;
    category: string | null;
    priority: string | null;
    deadline: string;
}

export const TaskForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<TaskFormInputs>();

    const submit = (data: TaskFormInputs) => {
        console.log(data);
    };

    const [value, setValue] = React.useState<string | null>(
        dayjs().format('YYYY-MM-DD')
    );

    const handleChange = (newValue: string | null) => {
        setValue(dayjs(newValue).format('YYYY-MM-DD'));
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Controller
                name="title"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                    <TextField
                        variant="standard"
                        label="Название задачи"
                        helperText={errors.title?.message}
                        error={!!errors.title}
                        autoFocus
                        fullWidth
                        sx={{ mb: 2 }}
                        {...field}
                    />
                )}
            />

            <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                <InputLabel>Укажите категорию</InputLabel>
                <Controller
                    name="category"
                    control={control}
                    defaultValue={'Категория'}
                    render={({ field }) => (
                        <Select {...field}>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    )}
                />
                <FormHelperText error={!errors.category}>
                    {errors.category?.message}
                </FormHelperText>
            </FormControl>

            <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                <InputLabel>Укажите приоритет</InputLabel>
                <Select>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                    <DesktopDatePicker
                        label="Укажите дату"
                        inputFormat="YYYY/MM/DD"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => (
                            <TextField variant="standard" {...params} />
                        )}
                    />
                </Stack>
            </LocalizationProvider>
            <Button type="submit">Создать задачу</Button>
        </form>
    );
};
