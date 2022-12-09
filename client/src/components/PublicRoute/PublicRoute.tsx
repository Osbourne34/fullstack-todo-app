import React from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks';

import { routes } from '../../pages/routes';

interface PublicRouteProps {
    children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to={routes.main} />;
    }

    return <>{children}</>;
};
