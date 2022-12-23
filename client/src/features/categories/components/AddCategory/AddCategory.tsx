import React, { useState } from 'react';

import { useAuth } from '../../../../hooks';
import { useCreateCategoryMutation } from '../../api';

import { useSnackbar } from 'notistack';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { CreateAndUpdateForm } from '../../../../components';
import { CreateAndUpdateFormInput } from '../../../../types/CreateAndUpdateFormInput';

export const AddCategory = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { token } = useAuth();
    const [createCategory, { error, reset }] = useCreateCategoryMutation();

    const [open, setOpen] = useState<boolean>(false);

    const handleCreateCategory = async ({
        title,
    }: CreateAndUpdateFormInput) => {
        await createCategory({ body: { title }, token })
            .unwrap()
            .then(() => {
                setOpen(false);
                enqueueSnackbar('Категория добавлена', { variant: 'success' });
            });
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
                        onSubmit={handleCreateCategory}
                        onClose={handleClose}
                        error={error}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};
