import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    confirm: () => void;
    loading: boolean;
    contentTitle: string;
    contentSubtitle: string;
}

export const ConfirmDialog = ({
    open,
    onClose,
    confirm,
    loading,
    contentTitle,
    contentSubtitle,
}: ConfirmDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Подтвердите действие</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {contentTitle} <br />({contentSubtitle})
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading} variant="outlined">
                    Отмена
                </Button>
                <Button
                    onClick={confirm}
                    disabled={loading}
                    variant="contained"
                    color="error"
                >
                    Ок
                </Button>
            </DialogActions>
        </Dialog>
    );
};
