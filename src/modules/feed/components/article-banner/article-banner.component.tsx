import { FC } from 'react';
import { Container } from '../../../../common/components/container/container.component';
import { ArticleMeta } from '../article-meta/article-meta.component';

interface ArticleBannerProps {}

export const ArticleBanner: FC<ArticleBannerProps> = () => {
  return (
    <div className="bg-conduit-gray-1100 pt-8 pb-4 mb-8">
      <Container>
        <h1 className="text-white text-articleTitle font-semibold leading-articleTitle mb-8">
          Repellat nihil in magnam quasi. Et dicta at est laborum doloribus sit.
          Quia possimus necessitatibus magnam, est, nulla, reiciendis
          exercitationem neque et tenetur quia deserunt asperiores blanditiis
          doloribus ipsum beatae numquam. Ullam rerum consequuntur occaecati
          error. Possimus consequatur consectetur doloribus voluptate nihil,
          tenetur sunt fugiat quae id, ducimus non.
        </h1>
        <ArticleMeta />
      </Container>
    </div>
  );
};
