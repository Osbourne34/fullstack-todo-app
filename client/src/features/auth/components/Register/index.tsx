import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { useAppDispatch } from '../../../../hooks';
import { useRegisterMutation } from '../../api';
import { setAuth } from '../../slices';

import { AuthForm } from '../AuthForm';

import { isErrorWithMessage } from '../../../../types/ErrorsApi';
import { AuthFormInputs } from '../../../../types/AuthFormInputs';

import { routes } from '../../../../pages/routes';

export const Register = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [register] = useRegisterMutation();

    const handleRegister = async (body: AuthFormInputs) => {
        try {
            const response = await register(body).unwrap();
            localStorage.setItem('token', response.token);
            enqueueSnackbar('Вы зарегистрированы', {
                variant: 'success',
            });
            dispatch(setAuth(response));
            navigate(routes.main, { replace: true });
        } catch (error) {
            enqueueSnackbar(
                (isErrorWithMessage(error) && error.data.message) ||
                    'Ошибка при регистраций',
                { variant: 'error' }
            );
        }
    };

    return <AuthForm onSubmit={handleRegister} buttonText="Создать аккаунт" />;
};
