import React, { useEffect, useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import { useAppDispatch } from './hooks';
import { useLazyMeQuery } from './store/api/AuthApi';
import { setAuth } from './store/slices/authSlice';

import { SnackbarProvider } from 'notistack';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { Main, Register, Login } from './pages';
import { AuthLayout, ProtectedRoute, PublicRoute, Tasks } from './components';

export const App = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [me] = useLazyMeQuery();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            me(String(localStorage.getItem('token')))
                .unwrap()
                .then((data) => {
                    dispatch(
                        setAuth({
                            user: data,
                            token: String(localStorage.getItem('token')),
                        }),
                    );
                })
                .catch(() => {
                    localStorage.removeItem('token');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [dispatch, me]);

    return (
        <>
            {loading ? (
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <SnackbarProvider
                    maxSnack={3}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Main />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Tasks />} />
                            <Route path=":id" element={<Tasks />} />
                        </Route>
                        <Route
                            path="/register"
                            element={
                                <AuthLayout>
                                    <PublicRoute>
                                        <Register />
                                    </PublicRoute>
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <AuthLayout>
                                    <PublicRoute>
                                        <Login />
                                    </PublicRoute>
                                </AuthLayout>
                            }
                        />
                    </Routes>
                </SnackbarProvider>
            )}
        </>
    );
};
