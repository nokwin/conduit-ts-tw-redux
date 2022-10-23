import { FC } from 'react';

interface FavoriteButtonProps {
  count: number;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({ count }) => {
  return (
    <button className="text-conduit-green border-conduit-green text-center align-middle cursor-pointer select-none border py-1 px-2 text-sm rounded-buttonSm hover:text-white hover:bg-conduit-green focus:text-white focus:bg-conduit-darkGreen">
      <i className="ion-heart"></i>
      <span className="ml-1 font-normal">{count}</span>
    </button>
  );
};
