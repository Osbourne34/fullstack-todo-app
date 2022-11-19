import React, { useRef } from 'react';

import { useAppDispatch } from '../../../hooks';
import {
    setIdToUpdateTitle,
    setTitleToUpdate,
    setIdToDelete,
} from '../../../store/slices/prioritySlice';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface PriorityItemProps {
    title: string;
    id: string;
    color: string | null;
    onUpdateColor: (id: string, color: string) => void;
}

export const PriorityItem = ({
    title,
    color,
    id,
    onUpdateColor,
}: PriorityItemProps) => {
    const colorValue = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    const handleUpdateTitle = () => {
        dispatch(setIdToUpdateTitle(id));
        dispatch(setTitleToUpdate(title));
    };

    const handleUpdateColor = () => {
        onUpdateColor(id, colorValue.current?.value || '#000000');
    };

    const handleDelete = () => {
        dispatch(setIdToDelete(id));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&:last-of-type': {
                    mb: 2,
                },
            }}
        >
            <Typography
                sx={{
                    '&:first-letter': {
                        textTransform: 'capitalize',
                    },
                }}
            >
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input
                    ref={colorValue}
                    onBlur={handleUpdateColor}
                    defaultValue={color || '#000000'}
                    readOnly
                    type="color"
                />
                <IconButton onClick={handleUpdateTitle} sx={{ ml: 1 }}>
                    <EditRoundedIcon />
                </IconButton>
                <IconButton onClick={handleDelete} color="error" sx={{ ml: 1 }}>
                    <DeleteRoundedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};
