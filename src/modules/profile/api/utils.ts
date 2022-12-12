import { Drafted } from 'immer/dist/internal';
import { RootState } from '../../../store/store';
import { replacesCachedProfileInArticle } from '../../feed/api/utils';
import { Profile } from './dto/follow-user.in';
import { GetProfileInDTO } from './dto/get-profile.in';

const updateProfile = <Q>(
  feedKey: string,
  data: { profile: Profile },
  feedKeys: string[],
  state: RootState,
  dispatch: any,
  profileApi: any
) => {
  for (
    let i = 0, key = feedKeys[i], queryItem = state.profileApi.queries[key];
    i < feedKeys.length;
    i++, key = feedKeys[i], queryItem = state.profileApi.queries[key]
  ) {
    if (!key.startsWith(feedKey)) {
      continue;
    }

    const profileToUpdate = state.profileApi.queries[key]
      ?.data as GetProfileInDTO;

    if (profileToUpdate.profile.username !== data.profile.username) {
      continue;
    }

    dispatch(
      profileApi.util.updateQueryData(
        feedKey,
        queryItem!.originalArgs as Q,
        (draft: Drafted<GetProfileInDTO>) => {
          draft.profile.following = data.profile.following;
        }
      )
    );
  }
};

export const replaceCachedProfile = async (
  getState: any,
  queryFulfilled: any,
  dispatch: any,
  profileApi: any
) => {
  const state = getState() as RootState;

  try {
    const { data } = await queryFulfilled;
    const feedKeys = Object.keys(state.profileApi.queries);

    updateProfile('getProfile', data, feedKeys, state, dispatch, profileApi);
    replacesCachedProfileInArticle(getState, queryFulfilled, dispatch);
  } catch (e) {}
};
