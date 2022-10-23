import { FC } from 'react';
import { Container } from '../../../../common/components/container/container.component';
import { useGetGlobalFeedQuery } from '../../api/repository';
import { ArticleList } from '../article-list/article-list.component';
import { FeedToggle } from '../feed-toggle/feed-toggle.component';

interface FeedProps {}

export const Feed: FC<FeedProps> = () => {
  const { data, error, isLoading } = useGetGlobalFeedQuery('');

  if (isLoading) {
    return <Container>Feed loading...</Container>;
  }

  if (error) {
    return <Container>Error while loading feed</Container>;
  }

  return (
    <Container>
      <FeedToggle />
      <div className="flex">
        <ArticleList list={data?.articles || []} />
        <div className="w-1/4">tags</div>
      </div>
    </Container>
  );
};
