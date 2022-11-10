import React from 'react';

import { useForm, Controller } from 'react-hook-form';

import { Button, TextField } from '@mui/material';

export interface AuthFormInputs {
    login: string;
    password: string;
}

interface AuthFormProps {
    onSubmit: (body: AuthFormInputs) => void;
}

export const AuthForm = ({ onSubmit }: AuthFormProps) => {
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
                Войти
            </Button>
        </form>
    );
};
