import React from 'react';

import { Outlet } from 'react-router-dom';

import Container from '@mui/material/Container';

export const AuthLayout = () => {
    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <Outlet />
        </Container>
    );
};
