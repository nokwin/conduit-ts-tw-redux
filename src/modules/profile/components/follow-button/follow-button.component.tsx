import { ComponentProps, FC } from 'react';
import {
  Button,
  ButtonStyleEnum,
} from '../../../../common/components/button/button.component';

interface FollowButtonProps {
  username: string;
  btnStyle?: ComponentProps<typeof Button>['btnStyle'];
}

export const FollowButton: FC<FollowButtonProps> = ({
  username,
  btnStyle = ButtonStyleEnum.DARK,
}) => {
  return (
    <Button btnStyle={btnStyle}>
      <i className="ion-plus-round" />
      &nbsp; Follow {username}
    </Button>
  );
};
