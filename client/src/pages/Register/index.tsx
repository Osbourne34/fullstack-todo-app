import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { Register } from '../../features/auth';

import { routes } from '../routes';

export const RegisterPage = () => {
    return (
        <>
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Создание аккаунта
            </Typography>

            <Register />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                }}
            >
                <Typography sx={{ mr: 1 }}>Есть аккаунт?</Typography>
                <Link component={RouterLink} to={routes.login}>
                    Войти
                </Link>
            </Box>
        </>
    );
};
