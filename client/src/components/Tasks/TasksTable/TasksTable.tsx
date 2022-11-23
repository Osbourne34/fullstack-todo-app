import React from 'react';

import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { auth } from '../../../store/slices/authSlice';
import { useGetAllTasksQuery } from '../../../store/api/TaskApi';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

import { Loader } from '../../../components';
import { TaskItem } from '../TaskItem/TaskItem';

export const TasksTable = () => {
    const { token } = useAppSelector(auth);
    const location = useLocation();

    const { data: tasks, isLoading, error } = useGetAllTasksQuery({ token });

    if (error) {
        <Typography variant="h2">Ошибка при загрузке данных...</Typography>;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>№</TableCell>
                        <TableCell>Название</TableCell>
                        <TableCell>Срок</TableCell>
                        <TableCell>Категория</TableCell>
                        <TableCell>Приоритет</TableCell>
                        <TableCell align="right">Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks?.map((task) => (
                        <TaskItem key={task._id} {...task} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
