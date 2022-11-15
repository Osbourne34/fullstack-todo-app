import React from 'react';

import { useAppSelector } from '../../../hooks';
import { auth } from '../../../store/slices/authSlices';
import {
    useGetAllPrioritiesQuery,
    useUpdatePriorityMutation,
} from '../../../store/api/PriorityApi';

import { Loader } from '../../../components';
import { PriorityItem } from '../../Priorities';

export const PriorityList = () => {
    const { token } = useAppSelector(auth);

    const { data, isLoading, error } = useGetAllPrioritiesQuery(token || '');

    const [updatePriority] = useUpdatePriorityMutation();

    const handleUpdate = (id: string, color: string) => {
        console.log(id, color);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Произошла ошибка</div>;
    }

    return (
        <>
            {data &&
                data.map(({ _id, color, title }) => (
                    <PriorityItem
                        key={_id}
                        title={title}
                        color={color}
                        id={_id}
                        onUpdate={handleUpdate}
                    />
                ))}
        </>
    );
};
