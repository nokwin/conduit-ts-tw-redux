import { FC } from 'react';
import { FollowButton } from '../../../profile/components/follow-button/follow-button.component';
import {
  ArticleAuthor,
  NameStyleEnum,
} from '../article-author/article-author.component';
import { FavoriteButton } from '../favorite-button/favorite-button.component';

interface ArticleMetaProps {
  authorNameStyle?: keyof typeof NameStyleEnum;
}

export const ArticleMeta: FC<ArticleMetaProps> = ({
  authorNameStyle = NameStyleEnum.LIGHT,
}) => {
  return (
    <div>
      <div className="inline-block">
        <ArticleAuthor
          author={{
            username: 'John Snow',
            image: 'https://api.realworld.io/images/demo-avatar.png',
            following: false,
          }}
          createdAt={new Date().toISOString()}
          nameStyle={authorNameStyle}
        />
      </div>
      <div className="inline-flex gap-4">
        <FollowButton username="John Snow" btnStyle="LIGHT" />
        <FavoriteButton count={84} extended />
      </div>
    </div>
  );
};
