import React from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { auth } from '../../store/slices/authSlices';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useAppSelector(auth);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};
