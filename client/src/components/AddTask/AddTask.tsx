import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { TaskForm } from '../../components';

export const AddTask = () => {
    const [open, setOpen] = useState<boolean>(false);

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
                    <TaskForm />
                </DialogContent>
            </Dialog>
        </>
    );
};
