import { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Container } from '../../../common/components/container/container.component';
import { useGetProfileFeedQuery } from '../../feed/api/repository';
import { FeedToggle } from '../../feed/components/feed-toggle/feed-toggle.component';
import { Feed } from '../../feed/components/feed/feed.component';
import { usePageParam } from '../../feed/hooks/use-page-param.hook';
import { useGetProfileQuery } from '../api/repository';
import { ProfileBanner } from '../components/profile-banner/profile-banner.component';

interface ProfilePageProps {}

export const ProfilePage: FC<ProfilePageProps> = () => {
  const { page } = usePageParam();
  const { profile } = useParams();
  const { pathname } = useLocation();

  const { data: profileInfo, isLoading: profileLoading } = useGetProfileQuery({
    username: profile!,
  });

  const { data, isLoading, isFetching, error } = useGetProfileFeedQuery({
    page,
    author: profile!,
    isFavorite: pathname.includes(
      `/@${encodeURIComponent(profile!)}/favorites`
    ),
  });

  const feedToggleItems = [
    {
      text: 'Favorited articles',
      link: `/@${encodeURIComponent(profile!)}/favorites`,
    },
  ];

  if (profileLoading) {
    return null;
  }

  return (
    <>
      <ProfileBanner profile={profileInfo!.profile} />
      <Container>
        <FeedToggle
          defaultText="My Articles"
          defaultLink={`/@${encodeURIComponent(profile!)}`}
          items={feedToggleItems}
        />
        <Feed
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
        />
      </Container>
    </>
  );
};
