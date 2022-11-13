import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../common/components/button/button.component';
import { routes } from '../../../../core/routes';
import { useAuth } from '../../../auth/hooks/use-auth';
import {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from '../../api/repository';

interface FavoriteButtonProps {
  count: number;
  slug: string;
  isFavorited: boolean;
  extended?: boolean;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  count,
  extended = false,
  slug,
  isFavorited = false,
}) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [triggerFavoroiteMutation, favoriteMutationState] =
    useFavoriteArticleMutation();
  const [triggerUnfavoriteMutation, unfavoriteMutationState] =
    useUnfavoriteArticleMutation();

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      navigate(routes.signIn.path);
      return;
    }

    if (isFavorited) {
      await triggerUnfavoriteMutation({ slug });
    } else {
      await triggerFavoroiteMutation({ slug });
    }
  };

  return (
    <Button
      btnStyle="GREEN"
      variant={isFavorited ? 'BASE' : 'OUTLINE'}
      onClick={handleFavoriteClick}
      disabled={
        favoriteMutationState.isLoading || unfavoriteMutationState.isLoading
      }
    >
      <i className="ion-heart"></i>
      <span className="ml-1 font-normal">
        {extended && 'Favorite Article ('}
        {count}
        {extended && ')'}
      </span>
    </Button>
  );
};
