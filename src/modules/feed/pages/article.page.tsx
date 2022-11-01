import { FC } from 'react';
import { Container } from '../../../common/components/container/container.component';
import { ArticleBanner } from '../components/article-banner/article-banner.component';
import { ArticleMeta } from '../components/article-meta/article-meta.component';
import { TagList } from '../components/tag-list/tag-list.component';

interface ArticlePageProps {}

export const ArticlePage: FC<ArticlePageProps> = () => {
  return (
    <>
      <ArticleBanner />
      <Container>
        <div className="pb-8 border-b mb-6">
          <p className="text-articleBody leading-articleBody font-sourceSerif mb-8">
            Iusto laborum aperiam neque delectus consequuntur provident est
            maiores explicabo. Laborum est maxime enim accusantium
            magnam.\nRerum dolorum minus laudantium delectus eligendi
            necessitatibus quia.\nDeleniti consequatur explicabo aut nobis est
            vero tempore.\nExcepturi earum quo quod voluptatem quo iure vel
            sapiente occaecati.\nConsectetur consequatur corporis doloribus
            omnis harum voluptas esse amet. Eveniet sit ipsa officiis
            laborum.\nIn vel est omnis sed impedit quod magni.\nDignissimos quis
            illum qui atque aut ut quasi sequi. Laborum itaque quos
            provident.\nRerum cupiditate praesentium amet voluptatem dolor
            impedit modi dicta.\nVoluptates assumenda optio est.\nNon aperiam
            nam consequuntur vel a commodi dicta incidunt. Blanditiis non quos
            aut dolore nulla unde.\nIncidunt repudiandae amet eius
            porro.\nTempora unde sapiente repellat voluptatem omnis et ut omnis
            in.\nEt pariatur odit qui minima perspiciatis non dolores. Maiores
            assumenda porro est ea necessitatibus qui qui dolorum.\nVelit
            suscipit ut ipsam odit aut earum. Non natus nihil. Doloribus
            temporibus dolorum placeat.\nFugit nulla quaerat.\nEveniet ratione
            odit sed non rerum.\nNemo tempore eveniet veritatis alias repellat
            et.\nVoluptas nisi quis commodi id. Animi enim quo deserunt.\nAmet
            facilis at laboriosam.\nRerum assumenda harum et sapiente suscipit
            ipsa fugiat.\nSunt ut aut rem expedita consequatur
            optio.\nRecusandae tenetur rerum quos culpa. Et fuga repellendus
            magnam dignissimos eius aspernatur rerum.
          </p>
          <TagList list={['123', '234']} />
        </div>
        <div className="flex justify-center">
          <ArticleMeta authorNameStyle="GREEN" />
        </div>
      </Container>
    </>
  );
};
