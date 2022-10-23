import { FC } from 'react';
import { Container } from '../../../../common/components/container/container.component';
import { ArticleList } from '../article-list/article-list.component';

interface FeedProps {}

export const Feed: FC<FeedProps> = () => {
  return (
    <Container>
      <div className="flex">
        <ArticleList />
        <div className="w-1/4">tags</div>
      </div>
    </Container>
  );
};
