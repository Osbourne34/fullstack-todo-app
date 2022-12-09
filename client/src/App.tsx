import React, { useEffect, useState } from 'react';

import { useAppDispatch } from './hooks';
import { useLazyMeQuery, setAuth } from './features/auth';

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
            me(localStorage.getItem('token') as string)
                .unwrap()
                .then((response) => {
                    dispatch(
                        setAuth({
                            user: response,
                            token: localStorage.getItem('token') as string,
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
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Routing />
                </SnackbarProvider>
            )}
        </>
    );
};
