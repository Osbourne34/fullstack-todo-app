import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { ui, setIsOpenDrawer } from '../../store/slices/uiSlice';

import { Drawer as MaterialDrawer } from '@mui/material';

import { DRAWER_WIDTH } from '../../constants/ui';

interface Props {
    window?: () => Window;
    Component: React.ComponentType;
}

export const Drawer = ({ window, Component }: Props) => {
    const dispatch = useAppDispatch();
    const { isOpenDrawer } = useAppSelector(ui);

    const handleDrawerToggle = () => {
        dispatch(setIsOpenDrawer());
    };

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <MaterialDrawer
                variant="temporary"
                open={isOpenDrawer}
                onClose={handleDrawerToggle}
                container={container}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                    },
                }}
            >
                {<Component />}
            </MaterialDrawer>
            <MaterialDrawer
                variant="persistent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                    },
                }}
                open
            >
                {<Component />}
            </MaterialDrawer>
        </>
    );
};
