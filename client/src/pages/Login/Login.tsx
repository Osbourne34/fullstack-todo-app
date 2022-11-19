import React from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks';
import { useLoginMutation } from '../../store/api/AuthApi';
import { setAuth } from '../../store/slices/authSlice';

import { useSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import { AuthForm } from '../../components';

import { isErrorWithMessage } from '../../types/ErrorsApi';
import { AuthFormInputs } from '../../types/AuthFormInputs';

export const Login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [login, { error }] = useLoginMutation();

    const onSubmit = async (body: AuthFormInputs) => {
        await login(body)
            .unwrap()
            .then((data) => {
                localStorage.setItem('token', data.token);
                dispatch(setAuth(data));
                navigate('/', { replace: true });
                enqueueSnackbar('Вы авторизованы', { variant: 'success' });
            });
    };

    return (
        <>
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Войти
            </Typography>

            {error && (
                <Alert
                    variant="filled"
                    severity="error"
                    sx={{ width: '100%', mb: 3 }}
                >
                    {(isErrorWithMessage(error) && error.data.message) ||
                        'Ошибка при входе'}
                </Alert>
            )}

            <AuthForm onSubmit={onSubmit} />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                }}
            >
                <Typography sx={{ mr: 1 }}>Нет аккаунта?</Typography>
                <Link component={RouterLink} to="/register">
                    Создать аккаунт
                </Link>
            </Box>
        </>
    );
};
