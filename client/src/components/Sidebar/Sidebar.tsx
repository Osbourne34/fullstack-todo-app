import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

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
                <IconButton>
                    <AddRoundedIcon />
                </IconButton>
            </Box>
            <Divider sx={{ mt: 1, mb: 2 }} />

            <TextField
                variant="standard"
                label="Поиск по категорий"
                fullWidth
                sx={{ mb: 2 }}
            />

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'secondary.main',
                    borderRadius: 1,
                    px: 2,
                    py: 1.5,
                }}
            >
                <Typography color="common.white">Все</Typography>
                <Paper sx={{ px: 1.5, py: 1 }}>1</Paper>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 1,
                    px: 2,
                    py: 1.5,
                    transition: '.2s',

                    '&:hover': {
                        bgcolor: 'grey.100',
                    },
                    '&:hover button': {
                        opacity: '1',
                    },
                }}
            >
                <Typography>Личное</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton sx={{ mr: 1, opacity: 0 }}>
                        <EditRoundedIcon />
                    </IconButton>
                    <Paper sx={{ px: 1.5, py: 1, bgcolor: 'grey.200' }}>
                        1
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
});
