import MDEditor from '@uiw/react-md-editor';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../../common/components/container/container.component';
import { useGetSingleArticleQuery } from '../api/repository';
import { ArticleBanner } from '../components/article-banner/article-banner.component';
import { ArticleMeta } from '../components/article-meta/article-meta.component';
import { CommentsList } from '../components/comments-list/comments-list.component';
import { TagList } from '../components/tag-list/tag-list.component';

interface ArticlePageProps {}

const convertNewLines = (body: string) => {
  return body.split('\\n').join('<br />');
};

export const ArticlePage: FC<ArticlePageProps> = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetSingleArticleQuery({ slug: slug! });

  if (isLoading) {
    return null;
  }

  if (!data) {
    return <h1>Article not found</h1>;
  }

  return (
    <>
      <ArticleBanner
        title={data.article.title}
        author={data.article.author}
        likes={data.article.favoritesCount}
        publishedAt={data.article.createdAt}
        slug={slug!}
        isFavorited={data.article.favorited}
      />
      <Container>
        <div className="pb-8 border-b mb-6">
          <MDEditor.Markdown
            source={convertNewLines(data.article.body)}
            className="text-articleBody leading-articleBody font-sourceSerif mb-8"
          />
          <TagList list={data.article.tagList} />
        </div>
        <div className="flex justify-center">
          <ArticleMeta
            authorNameStyle="GREEN"
            author={data.article.author}
            publishedAt={data.article.createdAt}
            likes={data.article.favoritesCount}
            slug={slug!}
            isFavorited={data.article.favorited}
          />
        </div>

        <CommentsList />
      </Container>
    </>
  );
};
