import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks';
import {
    setIdToUpdate,
    setTitleToUpdate,
    setIdToDelete,
} from '../../../store/slices/categorySlice';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import { CategoryActions } from '../../Categories';

import { styles } from './CategoryItem.styles';

interface CategoryItemProps {
    link: string;
    title: string;
    editable: boolean;
    inCompleteTasks: number;
}

export const CategoryItem = ({
    link,
    title,
    editable,
    inCompleteTasks,
}: CategoryItemProps) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleUpdate = () => {
        dispatch(setIdToUpdate(link));
        dispatch(setTitleToUpdate(title));
    };

    const handleDelete = () => {
        dispatch(setIdToDelete(link));
    };

    const isActive = (): boolean => {
        return pathname === link || pathname.slice(1) === link;
    };

    return (
        <Box onClick={() => navigate(link)} sx={styles.root(isActive)}>
            <Typography
                color={isActive() ? 'common.white' : ''}
                sx={{
                    '&:first-letter': {
                        textTransform: 'capitalize',
                    },
                }}
            >
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {editable && (
                    <CategoryActions
                        isActive={isActive}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                )}
                <Paper
                    sx={{
                        px: 1.5,
                        py: 1,
                        bgcolor: 'grey.200',
                    }}
                >
                    {`${inCompleteTasks}`}
                </Paper>
            </Box>
        </Box>
    );
};
