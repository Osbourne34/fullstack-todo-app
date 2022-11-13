import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit/dist/createAsyncThunk';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import { isErrorWithMessage } from '../../types/ErrorsApi';
import { CreateAndUpdateFormInput } from '../../types/CreateAndUpdateFormInput';

interface CreateAndUpdateFormProps {
    onSubmit: (body: CreateAndUpdateFormInput) => void;
    onClose: () => void;
    error: FetchBaseQueryError | SerializedError | undefined;
    defaultValue?: string;
}

export const CreateAndUpdateForm = ({
    onSubmit,
    onClose,
    error,
    defaultValue,
}: CreateAndUpdateFormProps) => {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<CreateAndUpdateFormInput>({
        defaultValues: { title: defaultValue },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
                <Alert
                    variant="filled"
                    severity="error"
                    sx={{ width: '100%', mb: 3 }}
                >
                    {(isErrorWithMessage(error) && error.data.message) ||
                        'Ошибка при созданий категорий'}
                </Alert>
            )}
            <Controller
                name="title"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                    <TextField
                        disabled={isSubmitting}
                        type="text"
                        variant="standard"
                        label="Название"
                        autoFocus
                        helperText={errors.title?.message}
                        error={!!errors.title}
                        fullWidth
                        {...field}
                    />
                )}
            />

            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                <Button
                    disabled={isSubmitting}
                    onClick={onClose}
                    variant="outlined"
                    sx={{ mr: 1 }}
                >
                    Отмена
                </Button>
                <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                >
                    Сохранить
                </Button>
            </Box>
        </form>
    );
};
