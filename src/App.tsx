import { FC } from 'react';
import { Banner } from './common/components/banner/banner.component';
import { Header } from './common/components/header/header.component';

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <div>
      <Header />
      <Banner />
    </div>
  );
};
