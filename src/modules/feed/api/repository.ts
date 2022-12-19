import { createApi } from '@reduxjs/toolkit/query/react';
import { realWorldBaseQuery } from '../../../core/api/realworld-base-query';
import { FEED_PAGE_SIZE } from '../consts';
import { ArticleCommentsInDTO } from './dto/article-comments.in';
import { CreateArticleInDTO } from './dto/create-article.in';
import { CreateArticleOutDTO } from './dto/create-article.out';
import { EditArticleInDTO } from './dto/edit-article.in';
import { EditArticleOutDTO } from './dto/edit-article.out';
import { FavoriteArticleInDTO } from './dto/favorite-article.in';
import { FeedArticle } from './dto/global-feed.in';
import { NewCommentInDTO } from './dto/new-comment.in';
import { NewCommentOutDTO } from './dto/new-comment.out';
import { PopularTagsInDTO } from './dto/popular-tags.in';
import { SingleArticleInDTO } from './dto/single-article.in';
import {
  addNewCommentToCache,
  removeCommentFromCache,
  replaceCachedArticle,
  transformResponse,
} from './utils';

interface BaseFeedParams {
  page: number;
}

export interface GlobalFeedParams extends BaseFeedParams {
  tag: string | null;
  isPersonalFeed: boolean;
}

interface ProfilePeedParams extends BaseFeedParams {
  author: string;
  isFavorite?: boolean;
}

export interface FeedData {
  articles: FeedArticle[];
  articlesCount: number;
}

interface SingleArticleParams {
  slug: string;
}

interface FavoriteArticleParams {
  slug: string;
}

interface CreateArticleParams {
  title: string;
  description: string;
  body: string;
  tags: string;
}

interface DeleteArticleParams {
  slug: string;
}

interface EditArticleParams extends CreateArticleParams {
  slug: string;
}

interface CreateCommentParams {
  articleSlug: string;
  comment: string;
}

interface DeleteCommentParams {
  id: number;
  articleSlug: string;
}

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: realWorldBaseQuery,
  endpoints: (builder) => ({
    // queries
    getGlobalFeed: builder.query<FeedData, GlobalFeedParams>({
      keepUnusedDataFor: 1,
      query: ({ page, tag, isPersonalFeed }) => ({
        url: isPersonalFeed ? '/articles/feed' : '/articles',
        params: {
          limit: FEED_PAGE_SIZE,
          offset: page * FEED_PAGE_SIZE,
          tag,
        },
      }),
      transformResponse,
    }),

    getProfileFeed: builder.query<FeedData, ProfilePeedParams>({
      keepUnusedDataFor: 1,
      query: ({ page, author, isFavorite = false }) => ({
        url: '/articles',
        params: {
          limit: FEED_PAGE_SIZE,
          offset: page * FEED_PAGE_SIZE,
          author: isFavorite ? undefined : author,
          favorited: !isFavorite ? undefined : author,
        },
      }),
      transformResponse,
    }),

    getPopularTags: builder.query<PopularTagsInDTO, any>({
      query: () => ({
        url: '/tags',
      }),
    }),

    getSingleArticle: builder.query<SingleArticleInDTO, SingleArticleParams>({
      keepUnusedDataFor: 1,
      query: ({ slug }) => ({
        url: `/articles/${slug}`,
      }),
    }),

    getCommentsForArticle: builder.query<
      ArticleCommentsInDTO,
      SingleArticleParams
    >({
      keepUnusedDataFor: 1,
      query: ({ slug }) => ({
        url: `/articles/${slug}/comments`,
      }),
    }),
    // ======================================================
    // mutations
    // ======================================================
    favoriteArticle: builder.mutation<
      FavoriteArticleInDTO,
      FavoriteArticleParams
    >({
      query: ({ slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'post',
      }),
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(getState, queryFulfilled, dispatch, feedApi);
      },
    }),

    unfavoriteArticle: builder.mutation<
      FavoriteArticleInDTO,
      FavoriteArticleParams
    >({
      query: ({ slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'delete',
      }),
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(getState, queryFulfilled, dispatch, feedApi);
      },
    }),

    createArticle: builder.mutation<CreateArticleInDTO, CreateArticleParams>({
      query: ({ title, description, body, tags }) => {
        const data: CreateArticleOutDTO = {
          article: {
            title,
            description,
            body,
            tagList: tags.split(',').map((tag) => tag.trim()),
          },
        };

        return {
          url: '/articles',
          method: 'post',
          data,
        };
      },
    }),

    editArticle: builder.mutation<EditArticleInDTO, EditArticleParams>({
      query: ({ title, description, body, tags, slug }) => {
        const data: EditArticleOutDTO = {
          article: {
            title,
            description,
            body,
            tagList: tags.split(',').map((tag) => tag.trim()),
          },
        };

        return {
          url: `/articles/${slug}`,
          method: 'put',
          data,
        };
      },
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await replaceCachedArticle(getState, queryFulfilled, dispatch, feedApi);
      },
    }),

    deleteArticle: builder.mutation<any, DeleteArticleParams>({
      query: ({ slug }) => {
        return {
          url: `/articles/${slug}`,
          method: 'delete',
        };
      },
    }),

    createComment: builder.mutation<NewCommentInDTO, CreateCommentParams>({
      query: ({ articleSlug, comment }) => {
        const data: NewCommentOutDTO = {
          comment: {
            body: comment,
          },
        };

        return {
          url: `/articles/${articleSlug}/comments`,
          method: 'post',
          data,
        };
      },
      onQueryStarted: async ({}, { dispatch, queryFulfilled, getState }) => {
        await addNewCommentToCache(getState, queryFulfilled, dispatch);
      },
    }),

    deleteComment: builder.mutation<any, DeleteCommentParams>({
      query: ({ id, articleSlug }) => {
        return {
          url: `/articles/${articleSlug}/comments/${id}`,
          method: 'delete',
        };
      },
      onQueryStarted: async (
        { id },
        { dispatch, queryFulfilled, getState }
      ) => {
        await removeCommentFromCache(getState, queryFulfilled, dispatch, {
          id,
        });
      },
    }),
  }),
});

export const {
  useGetGlobalFeedQuery,
  useGetProfileFeedQuery,
  useGetPopularTagsQuery,
  useGetSingleArticleQuery,
  useGetCommentsForArticleQuery,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = feedApi;
