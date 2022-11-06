import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetCommentsForArticleQuery } from '../../api/repository';
import { CommentItem } from '../comment-item/comment-item.component';

interface CommentsListProps {}

export const CommentsList: FC<CommentsListProps> = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetCommentsForArticleQuery({ slug: slug! });

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (!data?.comments) {
    return (
      <div>
        <p>
          <Link to="/sign-in">Sign in</Link> or{' '}
          <Link to="/sign-up">sign up</Link> to add comments on this article.
        </p>
        <p>No comments found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl	mx-auto mt-16 flex flex-col gap-3">
      <p>
        <Link to="/sign-in">Sign in</Link> or <Link to="/sign-up">sign up</Link>{' '}
        to add comments on this article.
      </p>
      {data.comments.map((comment) => (
        <CommentItem
          key={`comment-${comment.id}`}
          body={comment.body}
          author={comment.author}
          publishedAt={comment.createdAt}
        />
      ))}
    </div>
  );
};
