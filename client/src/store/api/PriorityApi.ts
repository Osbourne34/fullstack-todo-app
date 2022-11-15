import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants/url';
import { Priority } from '../../types/Priority';
import { CreateAndUpdateFormInput } from '../../types/CreateAndUpdateFormInput';

export const priorityApi = createApi({
    reducerPath: 'priorityApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Priority'],
    endpoints: (builder) => ({
        createPriority: builder.mutation<
            Priority,
            { body: CreateAndUpdateFormInput; token: string }
        >({
            query: ({ body, token }) => ({
                url: 'priority',
                method: 'POST',
                body,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Priority'],
        }),
        getAllPriorities: builder.query<Priority[], string>({
            query: (token) => ({
                url: 'priorities',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['Priority'],
        }),
        updatePriority: builder.mutation<Priority, any>({
            query: ({ id, token, body }) => ({
                url: `priority/${id}`,
                method: 'PATCH',
                body,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const {
    useCreatePriorityMutation,
    useGetAllPrioritiesQuery,
    useUpdatePriorityMutation,
} = priorityApi;
