import { createApi } from '@reduxjs/toolkit/query/react';
import { realWorldBaseQuery } from '../../../core/api/realworld-base-query';
import { GetProfileInDTO } from './dto/get-profile.in';

interface ProfileParams {
  username: string;
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: realWorldBaseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query<GetProfileInDTO, ProfileParams>({
      query: ({ username }) => ({
        url: `/profiles/${username}`,
      }),
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
