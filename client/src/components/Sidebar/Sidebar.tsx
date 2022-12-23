import React from 'react';

import { useAuth } from '../../hooks';
import { useInCompletedTasksQuery } from '../../store/api/TaskApi';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import {
    AddCategory,
    CategoryItem,
    SearchCategory,
    Categories,
} from '../../features/categories';

export const Sidebar = React.memo(() => {
    const { token } = useAuth();
    const { data: inCompleteTasks } = useInCompletedTasksQuery(token);

    return (
        <Box
            sx={{
                height: '100vh',
                overflowY: 'auto',
                p: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h6">Категорий</Typography>
                <AddCategory />
            </Box>
            <Divider sx={{ mt: 1, mb: 2 }} />

            <Box sx={{ mb: 2 }}>
                <SearchCategory />
            </Box>

            <CategoryItem
                link="/"
                title="Все"
                editable={false}
                inCompleteTasks={inCompleteTasks || 0}
            />

            <Divider sx={{ my: 2 }} />

            <Categories />
        </Box>
    );
});
