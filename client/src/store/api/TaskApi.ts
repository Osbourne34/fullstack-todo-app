import { emptySplitApi } from './api';

import { Task } from '../../types/Task';
import { TaskFormInputs } from '../../types/TaskFormInputs';

export const taskApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<
            Task[],
            { token: string; category?: string }
        >({
            query: ({ token, category }) => ({
                url: `${category ? `tasks?category=${category}` : 'tasks'}`,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['Task'],
        }),
        createTask: builder.mutation<
            Task,
            { body: TaskFormInputs; token: string }
        >({
            query: ({ body, token }) => ({
                url: 'task',
                method: 'POST',
                body,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Task'],
        }),
        updateTask: builder.mutation<
            Task,
            {
                id: string;
                token: string;
                body: { [key: string]: string | boolean };
            }
        >({
            query: ({ id, token, body }) => ({
                url: `task/${id}`,
                method: 'PATCH',
                body,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Task'],
        }),
    }),
});

export const {
    useCreateTaskMutation,
    useGetAllTasksQuery,
    useUpdateTaskMutation,
} = taskApi;
