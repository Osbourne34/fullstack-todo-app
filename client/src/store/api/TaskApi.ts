import { emptySplitApi } from './api';

import { Task } from '../../types/Task';
import { TasksResponse } from '../../types/TasksResponse';
import { TaskFormInputs } from '../../types/TaskFormInputs';
import { TaskStatisticsResponse } from '../../types/TaskStatisticsResponse';

export const taskApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<
            TasksResponse,
            {
                token: string;
                category?: string;
                limit: number;
                page: number;
                searchValue: string;
                completed: string;
                priority: string;
            }
        >({
            query: ({
                token,
                category,
                limit,
                page,
                searchValue,
                completed,
                priority,
            }) => ({
                url: `tasks`,
                params: {
                    category: category || '',
                    limit,
                    page,
                    searchValue,
                    completed,
                    priority,
                },
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['Task'],
        }),
        inCompletedTasks: builder.query<number, string>({
            query: (token) => ({
                url: 'inCompletedTasks',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['Task'],
        }),
        taskStatistics: builder.query<
            TaskStatisticsResponse,
            { token: string; category?: string }
        >({
            query: ({ token, category }) => ({
                url: 'taskStatistics',
                params: {
                    category: category || '',
                },
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
                    dispatch(taskApi.util.invalidateTags(['Task', 'Category']));
                } catch (error) {}
            },
        }),
        updateTask: builder.mutation<
            Task,
            {
                id: string;
                token: string;
                body: TaskFormInputs;
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
                    dispatch(taskApi.util.invalidateTags(['Task', 'Category']));
                } catch (error) {}
            },
        }),
        switchTaskExecutionTask: builder.mutation<
            Task,
            { id: string; token: string; completed: boolean }
        >({
            query: ({ id, token, completed }) => ({
                url: `switchTaskExecution/${id}`,
                method: 'PATCH',
                body: { completed },
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(taskApi.util.invalidateTags(['Task', 'Category']));
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
                    dispatch(taskApi.util.invalidateTags(['Task', 'Category']));
                } catch (error) {}
            },
        }),
    }),
});

export const {
    useCreateTaskMutation,
    useGetAllTasksQuery,
    useInCompletedTasksQuery,
    useTaskStatisticsQuery,
    useUpdateTaskMutation,
    useSwitchTaskExecutionTaskMutation,
    useDeleteTaskMutation,
} = taskApi;
