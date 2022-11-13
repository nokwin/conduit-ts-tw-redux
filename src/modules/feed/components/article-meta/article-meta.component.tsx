import { ComponentProps, FC } from 'react';
import { FollowButton } from '../../../profile/components/follow-button/follow-button.component';
import { Author } from '../../api/dto/global-feed.in';
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
          <FollowButton username={author.username} btnStyle="LIGHT" />
          <FavoriteButton
            count={likes || 0}
            extended
            slug={slug}
            isFavorited={isFavorited}
          />
        </div>
      )}
    </div>
  );
};
