import React from 'react';

import dayjs from 'dayjs';

import { useAppDispatch } from '../../../hooks';
import {
    setIdToUpdate,
    setDataToUpdate,
    setIdToDelete,
} from '../../../store/slices/taskSlice';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { TaskActions } from '../TaskActions/TaskActions';
import { Category } from '../../../types/Category';
import { Priority } from '../../../types/Priority';

interface TaskItemProps {
    _id: string;
    title: string;
    deadline: string;
    category: Category | null;
    priority: Priority | null;
    completed: boolean;
}

export const TaskItem = ({
    _id,
    title,
    deadline,
    category,
    priority,
    completed,
}: TaskItemProps) => {
    const dispatch = useAppDispatch();

    const handleUpdate = () => {
        dispatch(setIdToUpdate(_id));
        dispatch(
            setDataToUpdate({
                title,
                deadline: dayjs(deadline).format('YYYY-MM-DD'),
                category: category?._id || null,
                priority: priority?._id || null,
            }),
        );
    };

    const handleDelete = () => {
        dispatch(setIdToDelete(_id));
    };

    return (
        <TableRow
            sx={{
                '&:last-child td, &:last-child th': {
                    border: 0,
                },
                textDecoration: completed ? 'line-through' : '',
            }}
        >
            <TableCell
                sx={{
                    width: 30,
                    bgcolor: priority?.color || '#fff',
                    p: 0,
                }}
            ></TableCell>
            <TableCell>{_id}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{`${dayjs(deadline).format('YYYY-MM-DD')}`}</TableCell>
            <TableCell
                sx={{ '&:first-letter': { textTransform: 'uppercase' } }}
            >
                {category?.title || 'Без категорий'}
            </TableCell>
            <TableCell
                sx={{ '&:first-letter': { textTransform: 'uppercase' } }}
            >
                {priority?.title || 'Без приоритета'}
            </TableCell>
            <TableCell align="right">
                <TaskActions
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    id={_id}
                    completed={completed}
                />
            </TableCell>
        </TableRow>
    );
};
