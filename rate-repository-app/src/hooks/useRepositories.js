import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useState } from 'react';

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, first: 8, searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  const [loadingMore, setLoadingMore] = useState(false);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    
    if (!canFetchMore) {
      return;
    }

    setLoadingMore(true);
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
      },
    }).finally(() => {
      setLoadingMore(false);
    });
  };

  return {
    repositories: data?.repositories,
    loading,
    fetchMore: handleFetchMore,
    loadingMore,
    ...result,
  };
};

export default useRepositories;
