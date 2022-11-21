import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants/url';
import { Category } from '../../types/Category';
import { CreateAndUpdateFormInput } from '../../types/CreateAndUpdateFormInput';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        createCategory: builder.mutation<
            Category,
            { body: CreateAndUpdateFormInput; token: string }
        >({
            query: ({ body, token }) => ({
                url: 'category',
                method: 'POST',
                body,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Category'],
        }),
        getAllCategories: builder.query<
            Category[],
            { token: string; searchValue: string }
        >({
            query: ({ token, searchValue }) => ({
                url: `${
                    searchValue
                        ? `categories?search=${searchValue}`
                        : 'categories'
                }`,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['Category'],
        }),
        updateCategory: builder.mutation<
            Category,
            { id: string; body: CreateAndUpdateFormInput; token: string }
        >({
            query: ({ id, body, token }) => ({
                url: `category/${id}`,
                method: 'PATCH',
                body,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation<
            Category,
            { id: string; token: string }
        >({
            query: ({ id, token }) => ({
                url: `category/${id}`,
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useLazyGetAllCategoriesQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApi;
