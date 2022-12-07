import React, { useEffect, useState } from 'react';

import { useAppDispatch } from './hooks';
import { setAuth } from './store/slices/authSlice';
import { useLazyMeQuery } from './store/api/AuthApi';

import { SnackbarProvider } from 'notistack';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { Routing } from './pages';

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
                <SnackbarProvider
                    maxSnack={3}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Routing />
                </SnackbarProvider>
            )}
        </>
    );
};
