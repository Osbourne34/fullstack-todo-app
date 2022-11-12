import React from 'react';

import { useAppDispatch } from '../../hooks';
import { setAuth } from '../../store/slices/authSlices';
import { setIsOpenDrawer } from '../../store/slices/uiSlices';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { DRAWER_WIDTH } from '../../constants/ui';

export const Header = () => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        handleClose();
        dispatch(setAuth({ user: null, token: null }));
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <IconButton sx={{ mr: 1 }}>
                    <SettingsRoundedIcon />
                </IconButton>
                <IconButton onClick={handleMenu}>
                    <AccountCircle />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                </Menu>
            </div>
        </Box>
    );
};
