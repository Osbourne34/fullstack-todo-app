import React from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';

import { AddTask, Drawer, Header, Sidebar } from '../../components';

import { DRAWER_WIDTH } from '../../constants/ui';

export const Main = () => {
    return (
        <>
            <Drawer Component={Sidebar} />
            <Header />
            <Box
                sx={{
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { sm: `${DRAWER_WIDTH}px` },
                    p: 2,
                }}
            >
                <AddTask />
            </Box>
            <Outlet />
        </>
    );
};
