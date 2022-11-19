import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { auth } from '../../../store/slices/authSlice';
import {
    useGetAllPrioritiesQuery,
    useUpdatePriorityMutation,
    useDeletePriorityMutation,
} from '../../../store/api/PriorityApi';
import {
    priority,
    setIdToUpdateTitle,
    setTitleToUpdate,
    setIdToDelete,
} from '../../../store/slices/prioritySlice';

import { useSnackbar } from 'notistack';

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
    const { enqueueSnackbar } = useSnackbar();
    const { token } = useAppSelector(auth);
    const { idToUpdateTitle, titleToUpdate, idToDelete } =
        useAppSelector(priority);
    const dispatch = useAppDispatch();

    const {
        data,
        isLoading,
        error: loadingError,
    } = useGetAllPrioritiesQuery(token);
    const [updatePriority, { error: updateError, reset }] =
        useUpdatePriorityMutation();
    const [deletePriority, { isLoading: loadingDelete }] =
        useDeletePriorityMutation();

    const submitUpdate = ({ title }: CreateAndUpdateFormInput) => {
        updatePriority({ id: idToUpdateTitle, token, body: { title } })
            .unwrap()
            .then(() => {
                handleCloseDialog();
                enqueueSnackbar('Приоритет обновлен', { variant: 'info' });
            });
    };

    const handleUpdateColor = (id: string, color: string) => {
        updatePriority({ id, token, body: { color } })
            .unwrap()
            .then(() => {
                enqueueSnackbar('Цвет обновлен', { variant: 'info' });
            });
    };

    const confirmDeletion = () => {
        deletePriority({ id: idToDelete, token })
            .unwrap()
            .then(() => {
                handleCloseConfirm();
                enqueueSnackbar('Приоритет удален', { variant: 'error' });
            });
    };

    const handleCloseDialog = () => {
        reset();
        dispatch(setIdToUpdateTitle(''));
        dispatch(setTitleToUpdate(''));
    };

    const handleCloseConfirm = () => {
        dispatch(setIdToDelete(''));
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
                    />
                ))}

            <Dialog
                open={!!idToUpdateTitle}
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
