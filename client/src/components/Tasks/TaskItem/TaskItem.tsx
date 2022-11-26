import React from 'react';

import dayjs from 'dayjs';

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
            <TableCell>1</TableCell>
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
                <TaskActions completed={completed} id={_id} />
            </TableCell>
        </TableRow>
    );
};
