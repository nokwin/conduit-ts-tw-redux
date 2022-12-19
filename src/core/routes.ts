import { FC } from 'react';
import { SignInPage } from '../modules/auth/pages/sign-in.page';
import { SignUpPage } from '../modules/auth/pages/sign-up.page';
import { ArticlePage } from '../modules/feed/pages/article.page';
import { EditorPage } from '../modules/feed/pages/editor.page';
import { GlobalFeedPage } from '../modules/feed/pages/global-feed.page';
import { ProfilePage } from '../modules/profile/pages/profile.page';
import { SettingsPage } from '../modules/profile/pages/settings.page';

interface RouteItem {
  path: string;
  Element: FC;
  private?: boolean;
}

export const routes: Record<string, RouteItem> = {
  globalFeed: {
    path: '/',
    Element: GlobalFeedPage,
  },
  personalFeed: {
    path: '/personal-feed',
    Element: GlobalFeedPage,
    private: true,
  },
  profile: {
    path: '/@:profile',
    Element: ProfilePage,
  },
  profileFavorites: {
    path: '/@:profile/favorites',
    Element: ProfilePage,
  },
  singleArticle: {
    path: '/article/:slug',
    Element: ArticlePage,
  },
  signIn: {
    path: '/sign-in',
    Element: SignInPage,
  },
  signUp: {
    path: '/sign-up',
    Element: SignUpPage,
  },
  settings: {
    path: '/settings',
    Element: SettingsPage,
    private: true,
  },
  createArticle: {
    path: '/editor',
    Element: EditorPage,
    private: true,
  },
  editArticle: {
    path: '/editor/:slug',
    Element: EditorPage,
    private: true,
  },
};
