import React from 'react';

import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../../hooks';
import { useAuth } from '../../../hooks';
import {
    task,
    setIdToUpdate,
    setIdToDelete,
    setPage,
    setLimit,
} from '../../../store/slices/taskSlice';
import {
    useGetAllTasksQuery,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} from '../../../store/api/TaskApi';

import { useSnackbar } from 'notistack';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { Loader, TaskForm, ConfirmDialog } from '../../../components';
import { TaskItem } from '../TaskItem/TaskItem';

import { TaskFormInputs } from '../../../types/TaskFormInputs';

export const TasksTable = () => {
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useAppDispatch();
    const { token } = useAuth();
    const {
        idToUpdate,
        dataToUpdate,
        idToDelete,
        page,
        limit,
        searchValue,
        completed,
        priority,
    } = useAppSelector(task);
    const { id: category } = useParams();

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setPage(newPage));
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(setLimit(parseInt(event.target.value, 10)));
        setPage(0);
    };

    const {
        data: tasksResponse,
        isLoading,
        error,
    } = useGetAllTasksQuery({
        token,
        category,
        limit,
        page,
        searchValue,
        completed,
        priority,
    });
    const [updateTask, { error: updateError, reset }] = useUpdateTaskMutation();
    const [deleteTask, { isLoading: loadingDelete }] = useDeleteTaskMutation();

    const handleUpdate = async (body: TaskFormInputs) => {
        const data = {
            ...body,
            category: body.category || null,
            priority: body.priority || null,
        };

        await updateTask({ id: idToUpdate, token, body: data })
            .unwrap()
            .then(() => {
                enqueueSnackbar('???????????? ??????????????????', { variant: 'info' });
                handleCloseForm();
            });
    };

    const confirmDeletion = () => {
        deleteTask({ token, id: idToDelete })
            .unwrap()
            .then(() => {
                if (tasksResponse?.tasks.length === 1 && page !== 0) {
                    setPage(page - 1);
                }
                handleCloseConfirm();
                enqueueSnackbar('???????????? ??????????????', { variant: 'error' });
            });
    };

    const handleCloseForm = () => {
        reset();
        dispatch(setIdToUpdate(''));
    };

    const handleCloseConfirm = () => {
        dispatch(setIdToDelete(''));
    };

    let content = null;

    if (error) {
        content = (
            <Typography variant="h2">???????????? ?????? ???????????????? ????????????...</Typography>
        );
    } else if (isLoading) {
        content = <Loader />;
    } else if (tasksResponse) {
        content = (
            <>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>????????????????</TableCell>
                            <TableCell>????????</TableCell>
                            <TableCell>??????????????????</TableCell>
                            <TableCell>??????????????????</TableCell>
                            <TableCell align="right">????????????????</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasksResponse.tasks.map((task) => (
                            <TaskItem key={task._id} {...task} />
                        ))}
                    </TableBody>
                </Table>

                <TablePagination
                    labelDisplayedRows={({ from, count, to }) =>
                        `${from} - ${to} ???? ${count}`
                    }
                    labelRowsPerPage="?????????? ???? ????????????????"
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={tasksResponse.count}
                    rowsPerPage={limit}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <Dialog
                    open={!!idToUpdate}
                    onClose={handleCloseForm}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>???????????????????????????? ????????????</DialogTitle>

                    <DialogContent sx={{ overflow: 'visible' }}>
                        <TaskForm
                            onSubmit={handleUpdate}
                            onClose={handleCloseForm}
                            error={updateError}
                            buttonText="?????????????????? ????????????"
                            defaultValues={dataToUpdate}
                        />
                    </DialogContent>
                </Dialog>

                <ConfirmDialog
                    open={!!idToDelete}
                    onClose={handleCloseConfirm}
                    confirm={confirmDeletion}
                    loading={loadingDelete}
                    contentTitle="???? ?????????????????????????? ???????????? ?????????????? ?????????????"
                />
            </>
        );
    }
    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
            {content}
        </TableContainer>
    );
};
