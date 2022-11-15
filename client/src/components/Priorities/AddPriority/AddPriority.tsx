import React, { useState } from 'react';

import { useAppSelector } from '../../../hooks';
import { auth } from '../../../store/slices/authSlices';
import { useCreatePriorityMutation } from '../../../store/api/PriorityApi';

import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { CreateAndUpdateForm } from '../../../components';

import { CreateAndUpdateFormInput } from '../../../types/CreateAndUpdateFormInput';

export const AddPriority = () => {
    const { token } = useAppSelector(auth);
    const [open, setOpen] = useState<boolean>(false);

    const [createPriority, { error }] = useCreatePriorityMutation();

    const onSubmit = async ({ title }: CreateAndUpdateFormInput) => {
        await createPriority({ body: { title }, token: token || '' })
            .unwrap()
            .then(() => {
                handleClose();
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
                        onSubmit={onSubmit}
                        onClose={handleClose}
                        error={error}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};
