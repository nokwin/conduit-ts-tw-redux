import { FC } from 'react';
import { Banner } from './common/components/banner/banner.component';
import { Header } from './common/components/header/header.component';
import { Article } from './modules/feed/components/article/article.component';

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Article />
    </div>
  );
};
