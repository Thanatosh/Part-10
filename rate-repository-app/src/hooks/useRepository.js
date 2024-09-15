import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import { useState } from 'react';

const useRepository = (id, first = 6) => {
  const { data, loading, error, fetchMore, refetch } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id, first },
    fetchPolicy: 'cache-and-network',
  });

  const [loadingMore, setLoadingMore] = useState(false);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    setLoadingMore(true);
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
      },
    }).finally(() => {
      setLoadingMore(false);
    });
  };

  const repository = data?.repository || null;

  return { 
    repository, 
    loading, 
    error, 
    refetch, 
    fetchMore: handleFetchMore,
    loadingMore
  }
};

export default useRepository;
