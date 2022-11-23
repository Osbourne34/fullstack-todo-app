import React from 'react';

import dayjs from 'dayjs';
import * as yup from 'yup';

import { useAppSelector } from '../../hooks';
import { auth } from '../../store/slices/authSlice';
import { useGetAllCategoriesQuery } from '../../store/api/CategoriesApi';
import { useGetAllPrioritiesQuery } from '../../store/api/PriorityApi';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { TaskFormInputs } from '../../types/TaskFormInputs';

interface TaskFormProps {
    onSubmit: (body: TaskFormInputs) => void;
    onClose: () => void;
}

const schema = yup.object({
    title: yup.string().required('Обязательное поле'),
    deadline: yup
        .date()
        .min(
            dayjs().subtract(1, 'day'),
            'Дата не может быть меньше сегодняшней'
        ),
});

export const TaskForm = ({ onSubmit, onClose }: TaskFormProps) => {
    const { token } = useAppSelector(auth);

    const { data: categories } = useGetAllCategoriesQuery({ token });
    const { data: priorities } = useGetAllPrioritiesQuery(token);

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<TaskFormInputs>({
        defaultValues: {
            deadline: dayjs().format('YYYY-MM-DD'),
        },
        resolver: yupResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        variant="standard"
                        label="Название задачи"
                        helperText={errors.title?.message}
                        error={!!errors.title}
                        autoFocus
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                )}
            />

            <FormControl
                error={!!errors.category}
                variant="standard"
                fullWidth
                sx={{ mb: 2 }}
            >
                <InputLabel>Укажите категорию</InputLabel>
                <Controller
                    name="category"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select {...field}>
                            <MenuItem value="">Без категорий</MenuItem>

                            {categories?.map(({ title, _id }) => (
                                <MenuItem key={_id} value={_id}>
                                    {title}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                <FormHelperText error={true}>
                    {errors.category?.message}
                </FormHelperText>
            </FormControl>

            <FormControl
                error={!!errors.priority}
                variant="standard"
                fullWidth
                sx={{ mb: 2 }}
            >
                <InputLabel>Укажите приоритет</InputLabel>
                <Controller
                    name="priority"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select {...field}>
                            <MenuItem value="">Без приоритета</MenuItem>

                            {priorities?.map(({ title, _id }) => (
                                <MenuItem key={_id} value={_id}>
                                    {title}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                <FormHelperText error={true}>
                    {errors.priority?.message}
                </FormHelperText>
            </FormControl>

            <Controller
                name="deadline"
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => {
                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Укажите дату"
                                inputFormat="YYYY-MM-DD"
                                minDate={dayjs()}
                                value={value}
                                onChange={(data) => {
                                    onChange(data?.format('YYYY-MM-DD'));
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        helperText={error?.message}
                                        variant="standard"
                                        fullWidth
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    );
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
                <Button
                    disabled={isSubmitting}
                    onClick={onClose}
                    variant="outlined"
                    sx={{ mr: 2 }}
                >
                    Отмена
                </Button>
                <Button
                    disabled={isSubmitting}
                    variant="contained"
                    type="submit"
                >
                    Создать задачу
                </Button>
            </Box>
        </form>
    );
};
