import { ComponentProps, FC } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../auth/hooks/use-auth';
import { Author } from '../../api/dto/global-feed.in';
import { useDeleteCommentMutation } from '../../api/repository';
import {
  ArticleAuthor,
  NameStyleEnum,
} from '../article-author/article-author.component';

interface CommentMetaProps {
  commentId: number;
  author: Author;
  publishedAt: string;
  slug: string;
  authorNameStyle?: ComponentProps<typeof ArticleAuthor>['nameStyle'];
  authorDirection?: ComponentProps<typeof ArticleAuthor>['direction'];
  authorNameSize?: ComponentProps<typeof ArticleAuthor>['nameSize'];
}

export const CommentMeta: FC<CommentMetaProps> = ({
  commentId,
  authorNameStyle = NameStyleEnum.LIGHT,
  author,
  publishedAt,
  authorDirection,
  authorNameSize,
  slug,
}) => {
  const auth = useAuth();
  const [triggerDeleteComment, { isLoading }] = useDeleteCommentMutation();

  const deleteComment = async () => {
    try {
      await triggerDeleteComment({ articleSlug: slug, id: commentId }).unwrap();
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };

  const isAuthor = auth.user?.username === author.username;

  return (
    <div className="flex justify-between items-center">
      <ArticleAuthor
        author={author}
        publishedAt={publishedAt}
        nameStyle={authorNameStyle}
        direction={authorDirection}
        nameSize={authorNameSize}
      />

      {isAuthor && (
        <button onClick={deleteComment} disabled={isLoading}>
          <i className="ion-trash-a" />
        </button>
      )}
    </div>
  );
};
