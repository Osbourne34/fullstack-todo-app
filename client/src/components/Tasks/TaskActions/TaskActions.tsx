import React from 'react';

import { useAppSelector } from '../../../hooks';
import { auth } from '../../../store/slices/authSlice';
import { useUpdateTaskMutation } from '../../../store/api/TaskApi';

import { useSnackbar } from 'notistack';

import IconButton from '@mui/material/IconButton';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Checkbox from '@mui/material/Checkbox';

interface TaskActionsProps {
    completed: boolean;
    id: string;
}

export const TaskActions = ({ completed, id }: TaskActionsProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { token } = useAppSelector(auth);

    const [updateTask, { isLoading }] = useUpdateTaskMutation();

    const handleCheked = () => {
        updateTask({ id, token, body: { completed: !completed } })
            .unwrap()
            .then((res) => {
                enqueueSnackbar(
                    `${
                        res.completed
                            ? 'Задача выполнена'
                            : 'Задача не выполнена'
                    }`,
                    { variant: `${res.completed ? 'success' : 'error'}` }
                );
            });
    };

    return (
        <>
            <IconButton>
                <EditRoundedIcon />
            </IconButton>
            <IconButton color="error" sx={{ mx: 1 }}>
                <DeleteRoundedIcon />
            </IconButton>
            <Checkbox
                disabled={isLoading}
                onChange={handleCheked}
                checked={completed}
            />
        </>
    );
};
