import { useSearchParams } from 'react-router-dom';
import { serializeSearchParams } from '../../../utils/router';

export const usePageParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 0;

  const setPage = (page: number) => {
    setSearchParams(serializeSearchParams({ page: String(page) }));
  };

  return { page, setPage };
};
