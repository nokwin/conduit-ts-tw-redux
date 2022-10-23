import { FC } from 'react';
import { Header } from './common/components/header/header.component';

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <div>
      <Header />
    </div>
  );
};
