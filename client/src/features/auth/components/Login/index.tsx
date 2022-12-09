import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { useAppDispatch } from '../../../../hooks';
import { useLoginMutation } from '../../api';
import { setAuth } from '../../../../store/slices/authSlice';

import { AuthForm } from '../../../../components';

import { isErrorWithMessage } from '../../../../types/ErrorsApi';
import { AuthFormInputs } from '../../../../types/AuthFormInputs';

export const Login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [login] = useLoginMutation();

    const handleLogin = async (body: AuthFormInputs) => {
        try {
            const response = await login(body).unwrap();
            localStorage.setItem('token', response.token);
            enqueueSnackbar('Вы авторизованы', { variant: 'success' });
            dispatch(setAuth(response));
            navigate('/', { replace: true });
        } catch (error) {
            enqueueSnackbar(
                (isErrorWithMessage(error) && error.data.message) ||
                    'Ошибка при входе',
                { variant: 'error' },
            );
        }
    };

    return <AuthForm onSubmit={handleLogin} buttonText="Войти" />;
};
