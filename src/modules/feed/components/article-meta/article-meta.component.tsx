import { FC } from 'react';
import { FollowButton } from '../../../profile/components/follow-button/follow-button.component';
import { Author } from '../../api/dto/global-feed.in';
import {
  ArticleAuthor,
  NameStyleEnum,
} from '../article-author/article-author.component';
import { FavoriteButton } from '../favorite-button/favorite-button.component';

interface ArticleMetaProps {
  authorNameStyle?: keyof typeof NameStyleEnum;
  author: Author;
  likes: number;
  publishedAt: string;
}

export const ArticleMeta: FC<ArticleMetaProps> = ({
  authorNameStyle = NameStyleEnum.LIGHT,
  author,
  likes,
  publishedAt,
}) => {
  return (
    <div>
      <div className="inline-block">
        <ArticleAuthor
          author={author}
          publishedAt={publishedAt}
          nameStyle={authorNameStyle}
        />
      </div>
      <div className="inline-flex gap-4">
        <FollowButton username={author.username} btnStyle="LIGHT" />
        <FavoriteButton count={likes} extended />
      </div>
    </div>
  );
};
