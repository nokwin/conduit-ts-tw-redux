import { FC } from 'react';
import { ProfileBanner } from '../components/profile-banner/profile-banner.component';

interface ProfilePageProps {}

export const ProfilePage: FC<ProfilePageProps> = () => {
  return (
    <>
      <ProfileBanner />
    </>
  );
};
