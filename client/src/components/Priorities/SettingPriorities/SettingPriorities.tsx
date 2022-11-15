import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

import { AddPriority, PriorityList } from '../../Priorities';

export const SettingPriorities = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen} sx={{ mr: 1 }}>
                <SettingsRoundedIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Настройка приоритетов</DialogTitle>

                <DialogContent>
                    <PriorityList />
                    <AddPriority />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} variant="contained">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
