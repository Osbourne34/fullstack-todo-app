import React from 'react';
import { Outlet } from 'react-router-dom';

import { Drawer, Header, Sidebar } from '../../components';

export const Main = () => {
    return (
        <>
            <Drawer Component={Sidebar} />
            <Header />
            <Outlet />
        </>
    );
};
