import React, { useState } from 'react';

import { useAuth } from '../../../hooks';
import { useCreatePriorityMutation } from '../../../store/api/PriorityApi';

import { useSnackbar } from 'notistack';

import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { CreateAndUpdateForm } from '../../../components';

import { CreateAndUpdateFormInput } from '../../../types/CreateAndUpdateFormInput';

export const AddPriority = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { token } = useAuth();
    const [open, setOpen] = useState<boolean>(false);

    const [createPriority, { error }] = useCreatePriorityMutation();

    const handleCreatePriority = async ({
        title,
    }: CreateAndUpdateFormInput) => {
        await createPriority({ body: { title }, token })
            .unwrap()
            .then(() => {
                handleClose();
                enqueueSnackbar('Приоритет добавлен', { variant: 'success' });
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
            <Link onClick={handleOpen} sx={{ cursor: 'pointer' }}>
                Добавить приоритет
            </Link>

            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>Добавление приоритета</DialogTitle>

                <DialogContent sx={{ overflow: 'visible' }}>
                    <CreateAndUpdateForm
                        onSubmit={handleCreatePriority}
                        onClose={handleClose}
                        error={error}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};
