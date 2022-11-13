import React, { useState } from 'react';

import { useAppDispatch } from '../../hooks';
import { setAuth } from '../../store/slices/authSlices';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import AccountCircle from '@mui/icons-material/AccountCircle';

export const Avatar = () => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        handleClose();
        dispatch(setAuth({ user: null, token: null }));
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
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
        </>
    );
};
