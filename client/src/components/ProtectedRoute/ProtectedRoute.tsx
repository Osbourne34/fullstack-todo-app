import React from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks';

import { routes } from '../../pages/routes';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={routes.login} />;
    }

    return <>{children}</>;
};
