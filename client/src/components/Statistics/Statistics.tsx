import React from 'react';

import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { auth } from '../../store/slices/authSlice';
import { useTaskStatisticsQuery } from '../../store/api/TaskApi';

import Grid from '@mui/material/Grid';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';

import { StatisticsItem } from './StatisticsItem/StatisticsItem';

export const Statistics = () => {
    const { pathname } = useLocation();

    const { token } = useAppSelector(auth);
    const { data, isLoading } = useTaskStatisticsQuery({
        token,
        category: pathname.slice(1),
    });

    return (
        <Grid container spacing={3} sx={{ pt: 2 }}>
            <StatisticsItem
                descr={'Завершенные задачи'}
                Icon={CheckRoundedIcon}
                isLoading={isLoading}
            >
                {`${data?.completed} из ${data?.count}`}
            </StatisticsItem>
            <StatisticsItem
                descr={'Незавершенные задачи'}
                Icon={ThumbDownRoundedIcon}
                isLoading={isLoading}
            >
                {`${data?.inCompleted} из ${data?.count}`}
            </StatisticsItem>
            <StatisticsItem
                descr={'Процент завершенных задач'}
                Icon={AssessmentRoundedIcon}
                isLoading={isLoading}
            >
                {`${data?.percentageOfCompleted}%`}
            </StatisticsItem>
            <StatisticsItem
                descr={'Процент незавершенных задач'}
                Icon={ThumbDownRoundedIcon}
                isLoading={isLoading}
            >
                {`${data?.percentageOfInCompleted}%`}
            </StatisticsItem>
        </Grid>
    );
};
