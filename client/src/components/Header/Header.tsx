import React from 'react';

import { useAppDispatch } from '../../hooks';
import { setIsOpenDrawer } from '../../store/slices/uiSlice';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { Avatar } from '../../components';
import { SettingPriorities } from '../Priorities';

import { DRAWER_WIDTH } from '../../constants/ui';

export const Header = () => {
    const dispatch = useAppDispatch();

    const handleDrawerToggle = () => {
        dispatch(setIsOpenDrawer());
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                ml: { sm: `${DRAWER_WIDTH}px` },
            }}
        >
            <IconButton
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuRoundedIcon />
            </IconButton>

            <Button sx={{ display: { xs: 'none', sm: 'block' } }}>
                Скрыть статистику
            </Button>

            <div>
                <SettingPriorities />
                <Avatar />
            </div>
        </Box>
    );
};
