import clsx from 'clsx';
import { FC } from 'react';

enum ButtonStyleEnum {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

interface FollowButtonProps {
  username: string;
  btnStyle?: keyof typeof ButtonStyleEnum;
}

export const FollowButton: FC<FollowButtonProps> = ({
  username,
  btnStyle = ButtonStyleEnum.DARK,
}) => {
  const btnClasses = clsx(
    'text-center align-middle cursor-pointer select-none border py-1 px-2 text-sm rounded-buttonSm active:bg-conduit-gray-650',
    {
      'border-conduit-gray-700 text-conduit-gray-700 hover:bg-conduit-gray-400 focus:bg-conduit-gray-400':
        btnStyle === ButtonStyleEnum.DARK,
      'border-conduit-gray-400 text-conduit-gray-400 hover:bg-conduit-gray-400 hover:text-white':
        btnStyle === ButtonStyleEnum.LIGHT,
    }
  );

  return (
    <button className={btnClasses}>
      <i className="ion-plus-round" />
      &nbsp; Follow {username}
    </button>
  );
};
