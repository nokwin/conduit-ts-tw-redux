import { ComponentProps, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../../../common/components/button/button.component';
import { useAuth } from '../../../auth/hooks/use-auth';
import { FollowButton } from '../../../profile/components/follow-button/follow-button.component';
import { Author } from '../../api/dto/global-feed.in';
import { useDeleteArticleMutation } from '../../api/repository';
import {
  ArticleAuthor,
  NameStyleEnum,
} from '../article-author/article-author.component';
import { FavoriteButton } from '../favorite-button/favorite-button.component';

interface ArticleMetaProps {
  author: Author;
  publishedAt: string;
  slug: string;
  isFavorited: boolean;
  authorNameStyle?: ComponentProps<typeof ArticleAuthor>['nameStyle'];
  authorDirection?: ComponentProps<typeof ArticleAuthor>['direction'];
  authorNameSize?: ComponentProps<typeof ArticleAuthor>['nameSize'];
  likes?: number;
  showActionButtons?: boolean;
}

export const ArticleMeta: FC<ArticleMetaProps> = ({
  authorNameStyle = NameStyleEnum.LIGHT,
  author,
  likes,
  publishedAt,
  showActionButtons = true,
  authorDirection,
  authorNameSize,
  slug,
  isFavorited,
}) => {
  const auth = useAuth();
  const [triggerDeleteArticle, { isLoading }] = useDeleteArticleMutation();

  const navigate = useNavigate();
  const navigateToEdit = () => {
    navigate(`/editor/${slug}`);
  };

  const deleteArticle = async () => {
    try {
      await triggerDeleteArticle({ slug }).unwrap();
      navigate('/');
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  return (
    <div>
      <div className="inline-block">
        <ArticleAuthor
          author={author}
          publishedAt={publishedAt}
          nameStyle={authorNameStyle}
          direction={authorDirection}
          nameSize={authorNameSize}
        />
      </div>
      {showActionButtons && (
        <div className="inline-flex gap-4">
          {auth.user?.username === author.username ? (
            <>
              <Button onClick={navigateToEdit}>
                <i className="ion-edit" /> Edit Article
              </Button>
              <Button
                btnStyle="DANGER"
                onClick={deleteArticle}
                disabled={isLoading}
              >
                <i className="ion-trash-a" /> Delete Article
              </Button>
            </>
          ) : (
            <>
              <FollowButton
                username={author.username}
                btnStyle="LIGHT"
                isFollowed={author.following}
              />
              <FavoriteButton
                count={likes || 0}
                extended
                slug={slug}
                isFavorited={isFavorited}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
