import { emptySplitApi } from './api';

import { Priority } from '../../types/Priority';
import { CreateAndUpdateFormInput } from '../../types/CreateAndUpdateFormInput';

export const priorityApi = emptySplitApi.injectEndpoints({
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
        updatePriority: builder.mutation<
            Priority,
            { id: string; token: string; body: { [key: string]: string } }
        >({
            query: ({ id, token, body }) => ({
                url: `priority/${id}`,
                method: 'PATCH',
                body,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Priority', 'Task'],
        }),
        deletePriority: builder.mutation<
            Priority,
            { id: string; token: string }
        >({
            query: ({ id, token }) => ({
                url: `priority/${id}`,
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Priority', 'Task'],
        }),
    }),
});

export const {
    useCreatePriorityMutation,
    useGetAllPrioritiesQuery,
    useUpdatePriorityMutation,
    useDeletePriorityMutation,
} = priorityApi;
