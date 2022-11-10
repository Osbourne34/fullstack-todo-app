import React from 'react';

import { Drawer, Header, Sidebar } from '../../components';

export const Main = () => {
    return (
        <>
            <Drawer Component={Sidebar} />
            <Header />
        </>
    );
};
