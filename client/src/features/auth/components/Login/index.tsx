import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { useAppDispatch } from '../../../../hooks';
import { useLoginMutation } from '../../api';
import { setAuth } from '../../slices';

import { AuthForm } from '../';

import { isErrorWithMessage } from '../../../../types/ErrorsApi';
import { AuthFormInputs } from '../../../../types/AuthFormInputs';

import { routes } from '../../../../pages/routes';

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
            navigate(routes.main, { replace: true });
        } catch (error) {
            enqueueSnackbar(
                (isErrorWithMessage(error) && error.data.message) ||
                    'Ошибка при входе',
                { variant: 'error' }
            );
        }
    };

    return <AuthForm onSubmit={handleLogin} buttonText="Войти" />;
};
