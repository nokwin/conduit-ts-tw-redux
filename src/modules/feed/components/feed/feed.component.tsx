import { FC, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../../../../common/components/container/container.component';
import { serializeSearchParams } from '../../../../utils/router';
import { useGetGlobalFeedQuery } from '../../api/repository';
import { FEED_PAGE_SIZE } from '../../consts';
import { ArticleList } from '../article-list/article-list.component';
import { FeedToggle } from '../feed-toggle/feed-toggle.component';
import { TagCloud } from '../tag-cloud/tag-cloud.component';

interface FeedProps {}

export const Feed: FC<FeedProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 0
  );
  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected);
    setSearchParams(serializeSearchParams({ page: String(selected) }));
  };

  const { data, error, isLoading, isFetching } = useGetGlobalFeedQuery({
    page,
    tag: searchParams.get('tag'),
  });

  if (isLoading || isFetching) {
    return <Container>Feed loading...</Container>;
  }

  if (error) {
    return <Container>Error while loading feed</Container>;
  }

  return (
    <Container>
      <FeedToggle />
      <div className="flex">
        <div className="w-3/4">
          <ArticleList list={data?.articles || []} />
          <nav className="my-6">
            <ReactPaginate
              pageCount={(data?.articlesCount || 0) / FEED_PAGE_SIZE}
              pageRangeDisplayed={(data?.articlesCount || 0) / FEED_PAGE_SIZE}
              previousLabel={null}
              nextLabel={null}
              containerClassName="flex"
              pageClassName="group"
              pageLinkClassName="p-3 text-conduit-green bg-white border border-conduit-lightenGray -ml-px group-[&:nth-child(2)]:rounded-l group-[&:nth-last-child(2)]:rounded-r hover:bg-conduit-pageHoverBg"
              activeClassName="active group"
              activeLinkClassName="group-[.active]:bg-conduit-green group-[.active]:text-white group-[.active]:border-conduit-green"
              onPageChange={handlePageChange}
              forcePage={page}
            />
          </nav>
        </div>
        <div className="w-1/4 pl-3">
          <TagCloud />
        </div>
      </div>
    </Container>
  );
};
