import { FC } from 'react';
import { Banner } from './common/components/banner/banner.component';
import { Header } from './common/components/header/header.component';
import { ArticleList } from './modules/feed/components/article-list/article-list.component';
import { Article } from './modules/feed/components/article/article.component';
import { Feed } from './modules/feed/components/feed/feed.component';

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Feed />
    </div>
  );
};
