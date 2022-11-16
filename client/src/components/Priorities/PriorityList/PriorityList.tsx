import React, { useState } from 'react';

import { useAppSelector } from '../../../hooks';
import { auth } from '../../../store/slices/authSlices';
import {
    useGetAllPrioritiesQuery,
    useUpdatePriorityMutation,
    useDeletePriorityMutation,
} from '../../../store/api/PriorityApi';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import {
    Loader,
    CreateAndUpdateForm,
    ConfirmDialog,
} from '../../../components';
import { PriorityItem } from '../../Priorities';
import { CreateAndUpdateFormInput } from '../../../types/CreateAndUpdateFormInput';

export const PriorityList = () => {
    const [idToUpdate, setIdToUpdate] = useState<string>('');
    const [titleToUpdate, setTitleToUpdate] = useState<string>('');
    const [idToDelete, setIdToDelete] = useState<string>('');

    const { token } = useAppSelector(auth);

    const {
        data,
        isLoading,
        error: loadingError,
    } = useGetAllPrioritiesQuery(token || '');
    const [updatePriority, { error: updateError, reset }] =
        useUpdatePriorityMutation();
    const [deletePriority, { isLoading: loadingDelete }] =
        useDeletePriorityMutation();

    const submitUpdate = ({ title }: CreateAndUpdateFormInput) => {
        updatePriority({ id: idToUpdate, token: token || '', body: { title } })
            .unwrap()
            .then(() => {
                handleCloseDialog();
            });
    };

    const handleUpdateColor = (id: string, color: string) => {
        updatePriority({ id, token: token || '', body: { color } });
    };

    const confirmDeletion = () => {
        deletePriority({ id: idToDelete, token: token || '' })
            .unwrap()
            .then(() => {
                handleCloseConfirm();
            });
    };

    const handleUpdateTitle = (id: string, title: string) => {
        setIdToUpdate(id);
        setTitleToUpdate(title);
    };

    const handleDelete = (id: string) => {
        setIdToDelete(id);
    };

    const handleCloseDialog = () => {
        reset();
        setIdToUpdate('');
        setTitleToUpdate('');
    };

    const handleCloseConfirm = () => {
        setIdToDelete('');
    };

    if (isLoading) {
        return <Loader />;
    }

    if (loadingError) {
        return <div>Произошла ошибка</div>;
    }

    return (
        <>
            {data &&
                data.map(({ _id, color, title }) => (
                    <PriorityItem
                        key={_id}
                        title={title}
                        color={color}
                        id={_id}
                        onUpdateColor={handleUpdateColor}
                        onUpdateTitle={handleUpdateTitle}
                        onDelete={handleDelete}
                    />
                ))}

            <Dialog
                open={!!idToUpdate}
                onClose={handleCloseDialog}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Редактирование приоритета</DialogTitle>

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
                contentTitle="Вы действительно хотите удалить приоритет?"
                contentSubtitle="Сами задачи не удаляются"
            />
        </>
    );
};
