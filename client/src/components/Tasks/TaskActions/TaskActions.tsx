import React from 'react';

import IconButton from '@mui/material/IconButton';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Checkbox from '@mui/material/Checkbox';

export const TaskActions = () => {
    return (
        <>
            <IconButton>
                <EditRoundedIcon />
            </IconButton>
            <IconButton color="error" sx={{ mx: 1 }}>
                <DeleteRoundedIcon />
            </IconButton>
            <Checkbox />
        </>
    );
};
