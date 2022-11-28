import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import { auth } from '../../../store/slices/authSlice';
import {
    useGetAllCategoriesQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from '../../../store/api/CategoriesApi';
import {
    category,
    setIdToUpdate,
    setTitleToUpdate,
    setIdToDelete,
} from '../../../store/slices/categorySlice';

import { useSnackbar } from 'notistack';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { CategoryItem } from '../../Categories';
import {
    Loader,
    ConfirmDialog,
    CreateAndUpdateForm,
} from '../../../components';

import { CreateAndUpdateFormInput } from '../../../types/CreateAndUpdateFormInput';

export const CategoryList = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { idToUpdate, titleToUpdate, idToDelete, searchValue } =
        useAppSelector(category);
    const { token } = useAppSelector(auth);
    const dispatch = useAppDispatch();

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const {
        data: categories,
        isLoading: categoryLoading,
        error,
    } = useGetAllCategoriesQuery({ token, searchValue });
    const [updateCategory, { error: updateError, reset }] =
        useUpdateCategoryMutation();
    const [deleteCategory, { isLoading: loadingDelete }] =
        useDeleteCategoryMutation();

    const submitUpdate = async ({ title }: CreateAndUpdateFormInput) => {
        await updateCategory({
            id: idToUpdate,
            body: { title },
            token,
        })
            .unwrap()
            .then(() => {
                handleCloseDialog();
                enqueueSnackbar('Категория обновлена', { variant: 'info' });
            });
    };

    const confirmDeletion = () => {
        deleteCategory({ id: idToDelete, token })
            .unwrap()
            .then(() => {
                if (pathname.slice(1) === idToDelete) {
                    navigate('/');
                }
                handleCloseConfirm();
                enqueueSnackbar('Категория удалена', { variant: 'error' });
            });
    };

    const handleCloseDialog = () => {
        reset();
        dispatch(setIdToUpdate(''));
        dispatch(setTitleToUpdate(''));
    };

    const handleCloseConfirm = () => {
        dispatch(setIdToDelete(''));
    };

    if (categoryLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Произошла ошибка</div>;
    }

    return (
        <>
            {categories &&
                categories.map(({ _id, title, inCompleteTasks }) => (
                    <CategoryItem
                        key={_id}
                        link={_id}
                        title={title}
                        inCompleteTasks={inCompleteTasks}
                        editable
                    />
                ))}

            <Dialog
                open={!!idToUpdate}
                onClose={handleCloseDialog}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Редактирование категорий</DialogTitle>

                <DialogContent sx={{ overflow: 'visible' }}>
                    <CreateAndUpdateForm
                        onSubmit={submitUpdate}
                        onClose={handleCloseDialog}
                        error={updateError}
                        defaultValue={titleToUpdate}
                    />
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={!!idToDelete}
                onClose={handleCloseConfirm}
                confirm={confirmDeletion}
                loading={loadingDelete}
                contentTitle="Вы действительно хотите удалить категорию?"
                contentSubtitle="Сами задачи не удаляются"
            />
        </>
    );
};
