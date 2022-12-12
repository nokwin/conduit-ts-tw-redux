import { Drafted } from 'immer/dist/internal';
import { RootState } from '../../../store/store';
import { Profile } from '../../profile/api/dto/follow-user.in';
import { FeedArticle, GlobalFeedInDTO } from './dto/global-feed.in';
import { SingleArticleInDTO } from './dto/single-article.in';
import { feedApi, FeedData } from './repository';

export const transformResponse = (response: GlobalFeedInDTO) => {
  return {
    articles: response.articles || [],
    articlesCount: response.articlesCount || 0,
  };
};

const updateFeed = <Q>(
  feedKey: string,
  data: { article: FeedArticle },
  feedKeys: string[],
  state: RootState,
  dispatch: any,
  feedApi: any
) => {
  for (
    let i = 0, key = feedKeys[i], queryItem = state.feedApi.queries[key];
    i < feedKeys.length;
    i++, key = feedKeys[i], queryItem = state.feedApi.queries[key]
  ) {
    if (!key.startsWith(feedKey)) {
      continue;
    }

    dispatch(
      feedApi.util.updateQueryData(
        feedKey,
        queryItem!.originalArgs as Q,
        (draft: Drafted<FeedData> | Drafted<SingleArticleInDTO>) => {
          if ('articles' in draft) {
            const updateId = draft.articles.findIndex(
              (article) => article.slug === data.article.slug
            );

            if (updateId >= 0) {
              draft.articles[updateId] = data.article;
            }
          } else {
            draft.article.favorited = data.article.favorited;
            draft.article.favoritesCount = data.article.favoritesCount;
          }
        }
      )
    );
  }
};

export const replaceCachedArticle = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any,
  feedApi: any
) => {
  const state = getState() as RootState;

  try {
    const { data } = await queryFulfilled;
    const feedKeys = Object.keys(state.feedApi.queries);

    updateFeed('getGlobalFeed', data, feedKeys, state, dispatch, feedApi);
    updateFeed('getProfileFeed', data, feedKeys, state, dispatch, feedApi);
    updateFeed('getSingleArticle', data, feedKeys, state, dispatch, feedApi);
  } catch (e) {}
};

const updateProfile = <Q>(
  feedKey: string,
  data: { profile: Profile },
  feedKeys: string[],
  state: RootState,
  dispatch: any
) => {
  for (
    let i = 0, key = feedKeys[i], queryItem = state.feedApi.queries[key];
    i < feedKeys.length;
    i++, key = feedKeys[i], queryItem = state.feedApi.queries[key]
  ) {
    if (!key.startsWith(feedKey)) {
      continue;
    }

    dispatch(
      feedApi.util.updateQueryData(
        feedKey as any,
        queryItem!.originalArgs as Q,
        (draft) => {
          (draft as Drafted<SingleArticleInDTO>).article.author.following =
            data.profile.following;
        }
      )
    );
  }
};

export const replacesCachedProfileInArticle = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any
) => {
  const state = getState() as RootState;

  try {
    const { data } = await queryFulfilled;
    const feedKeys = Object.keys(state.feedApi.queries);

    updateProfile('getSingleArticle', data, feedKeys, state, dispatch);
  } catch (e) {}
};
