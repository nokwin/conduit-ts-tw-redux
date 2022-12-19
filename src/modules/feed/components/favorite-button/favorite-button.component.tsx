import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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

    try {
      if (isFavorited) {
        await triggerUnfavoriteMutation({ slug }).unwrap();
      } else {
        await triggerFavoroiteMutation({ slug }).unwrap();
      }
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
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
