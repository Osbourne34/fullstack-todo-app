import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Loader } from '../../../components';

import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';

interface StatisticsItemProps {
    descr: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
    };
    children: React.ReactNode;
    isLoading: boolean;
}

export const StatisticsItem = ({
    descr,
    Icon,
    children,
    isLoading,
}: StatisticsItemProps) => {
    return (
        <Grid item xs={3}>
            <Paper sx={{ p: 2, position: 'relative' }}>
                <Paper
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'warning.light',
                        p: 2,
                        position: 'absolute',
                        top: -16,
                        left: 16,
                        width: 80,
                        height: 80,
                    }}
                >
                    <Icon fontSize="large" sx={{ color: 'common.white' }} />
                </Paper>
                <Typography textAlign="right" variant="h4" sx={{ mb: 3 }}>
                    {isLoading ? <Loader /> : children}
                </Typography>
                <Divider />
                <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mt: 1 }}
                >
                    {descr}
                </Typography>
            </Paper>
        </Grid>
    );
};
