import React from 'react';

import * as yup from 'yup';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { AuthFormInputs } from '../../../../types/AuthFormInputs';

interface AuthFormProps {
    onSubmit: (body: AuthFormInputs) => void;
    buttonText: string;
}

const schema = yup.object({
    login: yup
        .string()
        .required('Обязательное поле')
        .min(3, 'Длина логина должна быть минимум 3 символа')
        .max(24, 'Длина логина должна быть максимум 24 символа')
        .trim(),
    password: yup
        .string()
        .required('Обязательное поле')
        .min(8, 'Длина пароля должна быть минимум 8 символов')
        .max(30, 'Длина пароля должна быть максимум 30 символа')
        .trim(),
});

export const AuthForm = ({ onSubmit, buttonText }: AuthFormProps) => {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<AuthFormInputs>({
        resolver: yupResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="login"
                control={control}
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
