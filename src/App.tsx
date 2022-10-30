import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './common/components/header/header.component';
import { GlobalFeedPage } from './modules/feed/pages/global-feed.page';
import { ProfilePage } from './modules/profile/pages/profile.page';

interface AppProps {}

export const App: FC<AppProps> = () => {
  return (
    <div className="pb-16">
      <Header />
      <Routes>
        <Route path="/" element={<GlobalFeedPage />} />
        <Route path="/@:profile" element={<ProfilePage />} />
        <Route path="/@:profile/favorites" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};
