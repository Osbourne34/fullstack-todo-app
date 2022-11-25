import { emptySplitApi } from './api';

import { Task } from '../../types/Task';
import { TaskFormInputs } from '../../types/TaskFormInputs';

export const taskApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
});

export const { useCreateTaskMutation, useGetAllTasksQuery } = taskApi;
