import React, { useMemo, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import {
    useGetAllCategoriesQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from '../../../store/api/CategoriesApi';
import { auth } from '../../../store/slices/authSlices';
import { searchValue } from '../../../store/slices/categotySearch';

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
    const [idToUpdate, setIdToUpdate] = useState<string>('');
    const [titleToUpdate, setTitleToUpdate] = useState<string>('');
    const [idToDelete, setIdToDelete] = useState<string>('');

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { token } = useAppSelector(auth);
    const { value } = useAppSelector(searchValue);

    const {
        data,
        isLoading: categoryLoading,
        error,
    } = useGetAllCategoriesQuery(token || '');
    const [updateCategory, { error: updateError, reset }] =
        useUpdateCategoryMutation();
    const [deleteCategory, { isLoading: loadingDelete }] =
        useDeleteCategoryMutation();

    const categories = useMemo(() => {
        return data?.filter(({ title }) =>
            title.toLowerCase().includes(value.toLocaleLowerCase())
        );
    }, [value, data]);

    const handleUpdate = (id: string, title: string) => {
        setIdToUpdate(id);
        setTitleToUpdate(title);
    };

    const handleDelete = (id: string) => {
        setIdToDelete(id);
    };

    const submitUpdate = async ({ title }: CreateAndUpdateFormInput) => {
        if (token) {
            await updateCategory({
                id: idToUpdate,
                body: { title },
                token,
            })
                .unwrap()
                .then(() => {
                    handleCloseDialog();
                });
        }
    };

    const confirmDeletion = () => {
        if (token) {
            deleteCategory({ id: idToDelete, token })
                .unwrap()
                .then(() => {
                    if (pathname.slice(1) === idToDelete) {
                        navigate('/');
                    }
                    handleCloseConfirm();
                });
        }
    };

    const handleCloseDialog = () => {
        reset();
        setIdToUpdate('');
        setTitleToUpdate('');
    };

    const handleCloseConfirm = () => {
        setIdToDelete('');
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
                categories.map(({ _id, title }) => (
                    <CategoryItem
                        key={_id}
                        link={_id}
                        title={title}
                        editable
                        onUpdate={() => handleUpdate(_id, title)}
                        onDelete={() => handleDelete(_id)}
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
