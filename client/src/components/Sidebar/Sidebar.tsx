import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import {
    AddCategory,
    CategoryItem,
    SearchCategory,
    CategoryList,
} from '../Categories';

export const Sidebar = React.memo(() => {
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

            <CategoryItem link="/" title="Все" editable={false} />

            <Divider sx={{ my: 2 }} />

            <CategoryList />
        </Box>
    );
});
