import { SxProps } from '@mui/material/styles';

export const styles = {
    root: (isActive: () => boolean, open: boolean): SxProps => {
        return {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: isActive()
                ? open
                    ? 'secondary.dark'
                    : 'secondary.main'
                : open
                ? 'grey.200'
                : '',
            borderRadius: 1,
            px: 2,
            py: 1.5,
            transition: '.2s',

            '&:hover': {
                bgcolor: isActive() ? 'secondary.dark' : 'grey.100',
            },
            '&:hover button': {
                opacity: '1',
            },

            textDecoration: 'none',
            color: 'inherit',
        };
    },
};
