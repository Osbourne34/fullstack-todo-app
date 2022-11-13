import React, { useState } from 'react';

import { useAppSelector } from '../../../hooks';
import { useCreateCategoryMutation } from '../../../store/api/CategoriesApi';
import { auth } from '../../../store/slices/authSlices';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { CreateAndUpdateForm } from '../../../components';
import { CreateAndUpdateFormInput } from '../../../types/CreateAndUpdateFormInput';

export const AddCategory = () => {
    const { token } = useAppSelector(auth);
    const [createCategory, { error, reset }] = useCreateCategoryMutation();

    const [open, setOpen] = useState<boolean>(false);

    const onSubmit = async ({ title }: CreateAndUpdateFormInput) => {
        if (token) {
            await createCategory({ body: { title }, token })
                .unwrap()
                .then(() => setOpen(false));
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        reset();
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <AddRoundedIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>Создание категорий</DialogTitle>

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
