import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './common/components/header/header.component';
import { routes } from './core/routes';

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <div className="pb-16">
      <Header />
      <Routes>
        {Object.values(routes).map((route) => (
          <Route path={route.path} element={<route.Element />} />
        ))}
      </Routes>
    </div>
  );
};
