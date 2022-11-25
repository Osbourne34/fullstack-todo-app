import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
    categoriesApi,
    useCreateCategoryMutation,
} from '../../../store/api/CategoriesApi';
import { auth } from '../../../store/slices/authSlice';

import { useSnackbar } from 'notistack';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import { CreateAndUpdateForm } from '../../../components';
import { CreateAndUpdateFormInput } from '../../../types/CreateAndUpdateFormInput';

export const AddCategory = () => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { token } = useAppSelector(auth);
    const [createCategory, { error, reset }] = useCreateCategoryMutation();

    const [open, setOpen] = useState<boolean>(false);

    const handleCreateCategory = async ({
        title,
    }: CreateAndUpdateFormInput) => {
        await createCategory({ body: { title }, token })
            .unwrap()
            .then(() => {
                dispatch(categoriesApi.util.invalidateTags(['Category']));
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
