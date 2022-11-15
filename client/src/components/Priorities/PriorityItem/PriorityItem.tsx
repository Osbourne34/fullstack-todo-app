import React, { useRef } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface PriorityItemProps {
    title: string;
    id: string;
    color: string | null;
    onUpdate: (id: string, color: string) => void;
}

export const PriorityItem = ({
    title,
    color,
    id,
    onUpdate,
}: PriorityItemProps) => {
    const colorValue = useRef<HTMLInputElement>(null);

    const handleUpdate = () => {
        console.dir(colorValue.current);
        onUpdate(id, colorValue.current?.value || '#000000');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1,
            }}
        >
            <Typography sx={{ textTransform: 'capitalize' }}>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input
                    ref={colorValue}
                    onBlur={handleUpdate}
                    value={color || '#000000'}
                    readOnly
                    type="color"
                />
                <IconButton sx={{ ml: 1 }}>
                    <EditRoundedIcon />
                </IconButton>
                <IconButton color="error" sx={{ ml: 1 }}>
                    <DeleteRoundedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};
