import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { styles } from './CategoryItem.styles';

interface CategoryItemProps {
    id?: string;
    category?: string;
}

export const CategoryItem = ({ id, category }: CategoryItemProps) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = (event: React.MouseEvent) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    const isActive = (): boolean => {
        return (pathname === '/' && !id) || pathname.slice(1) === id;
    };

    return (
        <Box
            onClick={() => navigate(`/${id ? id : ''}`)}
            sx={styles.root(isActive, open)}
        >
            <Typography color={isActive() ? 'common.white' : ''}>
                {category || 'Все'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {id && (
                    <>
                        <IconButton
                            onClick={handleOpenMenu}
                            sx={{
                                mr: 1,
                                opacity: open ? '1' : '0',
                                color: isActive() ? 'white' : '',
                            }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={handleCloseMenu}>
                                Редактировать
                            </MenuItem>
                            <MenuItem onClick={handleCloseMenu}>
                                Удалить
                            </MenuItem>
                        </Menu>
                    </>
                )}
                <Paper
                    sx={{
                        px: 1.5,
                        py: 1,
                        bgcolor: 'grey.200',
                    }}
                >
                    1
                </Paper>
            </Box>
        </Box>
    );
};
