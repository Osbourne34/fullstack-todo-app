import React from 'react';

import Box from '@mui/material/Box';

import { DRAWER_WIDTH } from '../../constants/ui';

export const Tasks = () => {
    return (
        <Box
            sx={{
                width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                ml: { sm: `${DRAWER_WIDTH}px` },
                p: 2,
            }}
        >
            Tasks
        </Box>
    );
};
