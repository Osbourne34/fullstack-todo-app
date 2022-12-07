import React from 'react';

import Box from '@mui/material/Box';

import {
    AddTask,
    Drawer,
    Header,
    Sidebar,
    TasksTable,
    TasksFilter,
    Statistics,
} from '../../components';

import { DRAWER_WIDTH } from '../../constants/ui';

export const MainPage = () => {
    return (
        <>
            <Drawer Component={Sidebar} />
            <Header />
            <Box
                sx={{
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { sm: `${DRAWER_WIDTH}px` },
                    p: 2,
                    pt: 0,
                }}
            >
                <Statistics />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 4,
                    }}
                >
                    <TasksFilter />
                    <AddTask />
                </Box>
                <TasksTable />
            </Box>
        </>
    );
};
