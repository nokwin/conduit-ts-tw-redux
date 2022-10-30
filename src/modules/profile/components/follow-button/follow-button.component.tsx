import { FC } from 'react';

interface FollowButtonProps {}

export const FollowButton: FC<FollowButtonProps> = () => {
  return (
    <button className="text-center align-middle cursor-pointer select-none border py-1 px-2 text-sm rounded-buttonSm border-conduit-gray-700 text-conduit-gray-700 hover:bg-conduit-gray-400 focus:bg-conduit-gray-400 active:bg-conduit-gray-650">
      <i className="ion-plus-round" />
      &nbsp; Follow John Snow
    </button>
  );
};
