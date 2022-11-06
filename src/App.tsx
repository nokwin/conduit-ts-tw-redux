import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './common/components/header/header.component';
import { SignInPage } from './modules/auth/pages/sign-in.page';
import { SignUpPage } from './modules/auth/pages/sign-up.page';
import { ArticlePage } from './modules/feed/pages/article.page';
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
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </div>
  );
};
