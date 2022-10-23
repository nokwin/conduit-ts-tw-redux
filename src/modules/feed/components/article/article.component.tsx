import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteButton } from '../favorite-button/favorite-button.component';
import { TagList } from '../tag-list/tag-list.component';

interface ArticleProps {}

export const Article: FC<ArticleProps> = () => {
  return (
    <article>
      <div className="border-t border-black/10 py-6">
        <div className="mb-4 font-light flex">
          <Link to="/@nokwin">
            <img
              src="https://api.realworld.io/images/demo-avatar.png"
              alt="nokwin avatar"
              className="inline-block h-8 w-8 rounded-full"
            />
          </Link>
          <div className="mr-6 ml-0.3 leading-4 inline-flex flex-col">
            <Link to="/@nokwin" className="font-medium">
              Dmytro Batarin
            </Link>
            <span className="text-conduit-gray text-date">9 october, 2022</span>
          </div>
          <FavoriteButton />
        </div>
        <Link to="/article/qwert" className="hover:no-underline">
          <h1 className="mb-1 font-semibold text-2xl text-conduit-darkestGray">
            Some title
          </h1>
          <p className="text-conduit-darkenGray font-light mb-1">
            Veritatis officiis est occaecati sunt consequatur. Aut sapiente
            totam sed ad ad qui eum omnis deleniti. Quis blanditiis aperiam.
          </p>
          <div className="flex justify-between">
            <span className="text-conduit-gray text-date font-light">
              Read more...
            </span>
            <TagList />
          </div>
        </Link>
      </div>
    </article>
  );
};
