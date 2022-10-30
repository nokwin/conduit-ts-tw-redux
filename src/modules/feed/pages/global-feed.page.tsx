import { FC } from 'react';
import { Banner } from '../../../common/components/banner/banner.component';
import { Feed } from '../components/feed/feed.component';

interface GlobalFeedPageProps {}

export const GlobalFeedPage: FC<GlobalFeedPageProps> = () => {
  return (
    <>
      <Banner />
      <Feed />
    </>
  );
};
