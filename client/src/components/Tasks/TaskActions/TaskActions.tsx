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
    onUpdate: () => void;
    onDelete: () => void;
}

export const TaskActions = ({
    completed,
    id,
    onUpdate,
    onDelete,
}: TaskActionsProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { token } = useAppSelector(auth);

    const [updateTask, { isLoading }] = useUpdateTaskMutation();

    const handleCompleted = () => {
        updateTask({ id, token, body: { completed: !completed } })
            .unwrap()
            .then((res) => {
                enqueueSnackbar(
                    `${res.completed ? 'Задача выполнена' : 'Задача активна'}`,
                    { variant: `${res.completed ? 'success' : 'info'}` },
                );
            });
    };

    return (
        <>
            <IconButton onClick={onUpdate}>
                <EditRoundedIcon />
            </IconButton>
            <IconButton onClick={onDelete} color="error" sx={{ mx: 1 }}>
                <DeleteRoundedIcon />
            </IconButton>
            <Checkbox
                disabled={isLoading}
                onChange={handleCompleted}
                checked={completed}
            />
        </>
    );
};
