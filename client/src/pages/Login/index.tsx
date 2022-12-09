import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { Login } from '../../features/auth';

export const LoginPage = () => {
    return (
        <>
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Войти
            </Typography>

            <Login />

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
