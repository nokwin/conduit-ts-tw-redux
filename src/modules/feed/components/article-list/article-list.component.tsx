import { FC } from 'react';
import { Article } from '../article/article.component';

interface ArticleListProps {}

export const ArticleList: FC<ArticleListProps> = () => {
  return (
    <div className="w-3/4">
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
    </div>
  );
};
