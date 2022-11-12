import React, { useEffect, useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import { useAppDispatch } from './hooks';
import { useLazyMeQuery } from './store/api/AuthApi';
import { setAuth } from './store/slices/authSlices';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { Main, Register, Login } from './pages';
import { AuthLayout, ProtectedRoute, PublicRoute } from './components';

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
                            token: localStorage.getItem('token'),
                        })
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
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Main />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<div>232332</div>} />
                        <Route path=":id" element={<div>232332</div>} />
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
            )}
        </>
    );
};