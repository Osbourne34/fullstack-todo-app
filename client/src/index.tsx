import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './store';

import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';

import { App } from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>,
);
