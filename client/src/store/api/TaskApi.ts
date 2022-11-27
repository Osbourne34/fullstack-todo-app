import { emptySplitApi } from './api';

import { Task } from '../../types/Task';
import { TasksResponse } from '../../types/TasksResponse';
import { TaskFormInputs } from '../../types/TaskFormInputs';

export const taskApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<
            TasksResponse,
            { token: string; category?: string; limit: number; page: number }
        >({
            query: ({ token, category, limit, page }) => ({
                url: `tasks?limit=${limit}&page=${page}`,
                // url: `${category ? `tasks?category=${category}` : 'tasks'}`,
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
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(taskApi.util.invalidateTags(['Task']));
                } catch (error) {}
            },
        }),
        updateTask: builder.mutation<
            Task,
            {
                id: string;
                token: string;
                body: TaskFormInputs | { [key: string]: string | boolean };
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
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(taskApi.util.invalidateTags(['Task']));
                } catch (error) {}
            },
        }),
        deleteTask: builder.mutation<Task, { id: string; token: string }>({
            query: ({ id, token }) => ({
                url: `task/${id}`,
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(taskApi.util.invalidateTags(['Task']));
                } catch (error) {}
            },
        }),
    }),
});

export const {
    useCreateTaskMutation,
    useGetAllTasksQuery,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = taskApi;
