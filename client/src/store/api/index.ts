import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants/api-url';

export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: () => ({}),
    tagTypes: ['Category', 'Priority', 'Task'],
});
