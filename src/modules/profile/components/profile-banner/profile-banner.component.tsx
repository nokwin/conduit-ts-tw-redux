import { FC } from 'react';
import { Container } from '../../../../common/components/container/container.component';
import { Profile } from '../../api/dto/get-profile.in';
import { FollowButton } from '../follow-button/follow-button.component';

interface ProfileBannerProps {
  profile: Profile;
}

export const ProfileBanner: FC<ProfileBannerProps> = ({ profile }) => {
  return (
    <div className="bg-conduit-gray-100 pt-8 pb-4 mb-8">
      <Container>
        <div>
          <img
            src={profile.image}
            className="w-25 h-25 rounded-full mx-auto mb-4"
            alt={`${profile.username} avatar`}
          />
          <h2 className="text-center font-bold text-2xl">{profile.username}</h2>
        </div>
        <div className="flex justify-end">
          <FollowButton username={profile.username} />
        </div>
      </Container>
    </div>
  );
};
