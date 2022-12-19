import { ComponentProps, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  ButtonStyleEnum,
} from '../../../../common/components/button/button.component';
import { routes } from '../../../../core/routes';
import { useAuth } from '../../../auth/hooks/use-auth';
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
  const auth = useAuth();
  const navigate = useNavigate();

  const toggleFollow = () => {
    if (!auth.isLoggedIn) {
      navigate(routes.signIn.path);
      return;
    }

    try {
      if (!isFollowed) {
        triggerFollow({ username: encodeURIComponent(username) }).unwrap();
      } else {
        triggerUnfollow({ username: encodeURIComponent(username) }).unwrap();
      }
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <Button btnStyle={btnStyle} onClick={toggleFollow}>
      <i className="ion-plus-round" />
      &nbsp; {isFollowed ? 'Unfollow' : 'Follow'} {username}
    </Button>
  );
};
