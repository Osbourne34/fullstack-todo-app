import React, { useState } from 'react';

import { useAppSelector } from '../../hooks';
import { auth } from '../../store/slices/authSlice';
import { useCreateTaskMutation } from '../../store/api/TaskApi';

import { useSnackbar } from 'notistack';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { TaskForm } from '../../components';

import { TaskFormInputs } from '../../types/TaskFormInputs';

export const AddTask = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { token } = useAppSelector(auth);

    const [createTask] = useCreateTaskMutation();

    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = async (body: TaskFormInputs) => {
        const data = {
            ...body,
            category: body.category || null,
            priority: body.priority || null,
        };

        await createTask({ token, body: data })
            .unwrap()
            .then(() => {
                handleClose();
                enqueueSnackbar('Задача создана', { variant: 'success' });
            });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpen} variant="contained">
                Добавить задачу
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Добавление задачи</DialogTitle>

                <DialogContent sx={{ overflow: 'visible' }}>
                    <TaskForm onSubmit={handleSubmit} onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    );
};
