import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants/url';
import { Task } from '../../types/Task';
import { TaskFormInputs } from '../../types/TaskFormInputs';

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Task'],
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
                url: 'tasks',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['Task'],
        }),
    }),
});

export const { useCreateTaskMutation, useGetAllTasksQuery } = taskApi;
