import React from 'react';

import Container from '@mui/material/Container';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
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
            {children}
        </Container>
    );
};
