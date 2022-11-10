import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthFormInputs } from '../../components';
import { API_URL } from '../../constants/url';
import { AuthResponse } from '../../types/AuthResponse';
import { User } from '../../types/User';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, AuthFormInputs>({
            query: (body) => ({
                url: 'register',
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation<AuthResponse, AuthFormInputs>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
        }),
        me: builder.query<User, string>({
            query: (token) => ({
                url: 'me',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useLazyMeQuery } =
    authApi;
