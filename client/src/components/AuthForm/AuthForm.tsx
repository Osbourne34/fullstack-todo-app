import React from 'react';

import { useForm, Controller } from 'react-hook-form';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { AuthFormInputs } from '../../types/AuthFormInputs';

interface AuthFormProps {
    onSubmit: (body: AuthFormInputs) => void;
    buttonText?: string;
}

export const AuthForm = ({ onSubmit, buttonText }: AuthFormProps) => {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<AuthFormInputs>();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="login"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                    <TextField
                        disabled={isSubmitting}
                        type="text"
                        label="Логин"
                        helperText={errors.login?.message}
                        error={!!errors.login}
                        autoFocus
                        fullWidth
                        {...field}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                    <TextField
                        disabled={isSubmitting}
                        type="password"
                        label="Пароль"
                        helperText={errors.password?.message}
                        error={!!errors.password}
                        fullWidth
                        sx={{ mt: 2 }}
                        {...field}
                    />
                )}
            />

            <Button
                disabled={isSubmitting}
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
            >
                {buttonText}
            </Button>
        </form>
    );
};
