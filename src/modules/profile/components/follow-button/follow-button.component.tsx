import { ComponentProps, FC } from 'react';
import {
  Button,
  ButtonStyleEnum,
} from '../../../../common/components/button/button.component';
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../../api/repository';

interface FollowButtonProps {
  username: string;
  isFollowed: boolean;
  btnStyle?: ComponentProps<typeof Button>['btnStyle'];
}

export const FollowButton: FC<FollowButtonProps> = ({
  username,
  isFollowed,
  btnStyle = ButtonStyleEnum.DARK,
}) => {
  const [triggerFollow] = useFollowUserMutation();
  const [triggerUnfollow] = useUnfollowUserMutation();

  const toggleFollow = () => {
    if (!isFollowed) {
      triggerFollow({ username: encodeURIComponent(username) });
    } else {
      triggerUnfollow({ username: encodeURIComponent(username) });
    }
  };

  return (
    <Button btnStyle={btnStyle} onClick={toggleFollow}>
      <i className="ion-plus-round" />
      &nbsp; {isFollowed ? 'Unfollow' : 'Follow'} {username}
    </Button>
  );
};
