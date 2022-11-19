import React from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { auth } from '../../store/slices/authSlice';

interface PublicRouteProps {
    children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const { user } = useAppSelector(auth);

    if (user) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};
