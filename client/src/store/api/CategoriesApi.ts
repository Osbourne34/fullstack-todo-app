import { emptySplitApi } from '.';
import { Category } from '../../types/Category';
import { CreateAndUpdateFormInput } from '../../types/CreateAndUpdateFormInput';

export const categoriesApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query<
            Category[],
            { token: string; searchValue?: string }
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
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(categoriesApi.util.invalidateTags(['Category']));
                } catch (error) {}
            },
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
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        categoriesApi.util.invalidateTags(['Category', 'Task'])
                    );
                } catch (error) {}
            },
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
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        categoriesApi.util.invalidateTags(['Category', 'Task'])
                    );
                } catch (error) {}
            },
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useLazyGetAllCategoriesQuery,
    useGetAllCategoriesQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApi;
