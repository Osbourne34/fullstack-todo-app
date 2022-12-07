import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { MainPage } from './Main';
import { RegisterPage } from './Register';
import { LoginPage } from './Login';

import { AuthLayout, ProtectedRoute, PublicRoute } from '../components';

export const Routing = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                }
            >
                <Route path=":id" element={<></>} />
            </Route>
            <Route path="auth" element={<AuthLayout />}>
                <Route
                    path="register"
                    element={
                        <PublicRoute>
                            <RegisterPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
            </Route>
        </Routes>
    );
};
