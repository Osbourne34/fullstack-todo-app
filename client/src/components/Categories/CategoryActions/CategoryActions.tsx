import React from 'react';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MoreVertIcon from '@mui/icons-material/MoreVert';

interface CategoryActionsProps {
    isActive: () => boolean;
    onUpdate: () => void;
    onDelete: () => void;
}

export const CategoryActions = ({
    isActive,
    onUpdate,
    onDelete,
}: CategoryActionsProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleUpdate = (event: React.MouseEvent) => {
        onUpdate();
        handleCloseMenu(event);
    };

    const handleDelete = (event: React.MouseEvent) => {
        onDelete();
        handleCloseMenu(event);
    };

    const handleCloseMenu = (event: React.MouseEvent) => {
        event.stopPropagation();
        setAnchorEl(null);
    };

    return (
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
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
                <MenuItem onClick={handleUpdate}>Редактировать</MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    Удалить
                </MenuItem>
            </Menu>
        </>
    );
};
