import { FC } from 'react';
import { Author } from '../../api/dto/global-feed.in';
import { ArticleMeta } from '../article-meta/article-meta.component';

interface CommentItemProps {
  body: string;
  author: Author;
  publishedAt: string;
}

export const CommentItem: FC<CommentItemProps> = ({
  body,
  author,
  publishedAt,
}) => {
  return (
    <div className="border border-conduit-gray-250 rounded">
      <div className="p-5">
        <p>{body}</p>
      </div>
      <div className="border-t border-conduit-gray-250 bg-conduit-gray-150 py-3 px-5">
        <ArticleMeta
          authorNameStyle="GREEN"
          author={author}
          publishedAt={publishedAt}
          showActionButtons={false}
          authorDirection="ROW"
          authorNameSize="SM"
        />
      </div>
    </div>
  );
};
