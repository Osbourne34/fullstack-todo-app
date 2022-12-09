import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { MainPage } from './Main';
import { RegisterPage } from './Register';
import { LoginPage } from './Login';

import {
    AuthLayout,
    ProtectedRoute,
    PublicRoute,
    TasksTable,
} from '../components';

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
                <Route index element={<TasksTable />} />
                <Route path=":id" element={<TasksTable />} />
            </Route>
            <Route element={<AuthLayout />}>
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
